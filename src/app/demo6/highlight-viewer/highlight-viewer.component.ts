// in angular.json setari pt ngx-extended-pdf-viewer & mammoth.js
// "assets" -> {
//   "glob": "**/*",
//   "input": "node_modules/ngx-extended-pdf-viewer/assets/",
//   "output": "/assets/"
// },
//  "scripts": ["node_modules/mammoth/mammoth.browser.min.js"],
//  "allowedCommonJsDependencies": ["mammoth", "fast-deep-equal"]

import { Component, ViewChild } from '@angular/core';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';
import { FileService } from 'src/app/services/file.service';
declare const PDFViewerApplication: any;

interface PdfHighlight {
  term: string;
  page: number;
  bboxes: [number, number, number, number][]; // left, top, width, height
}

interface TextHighlight {
  term: string;
  startIndex: number;
  endIndex: number;
}

interface BackendResponse {
  type: 'pdf' | 'txt';
  pdfBase64?: string;
  highlights: PdfHighlight[] | TextHighlight[];
}

@Component({
  selector: 'app-highlight-viewer',
  templateUrl: './highlight-viewer.component.html',
  styleUrls: ['./highlight-viewer.component.scss'],
})
export class HighlightViewerComponent {
  ACCEPTED_FILE_FORMATS = '.txt,.pdf, .docx';
  FILE_MAX_SIZE = 5242880;
  errorMessage = '';
  file = null;
  fileViewer: string;
  fileBase64: string;
  fileURL;
  fileText: string;
  textRenderedElements;
  timeIntervalViewerLoaded;
  text;
  viewerReady = false;
  originalDocxHtml: string = '';
  originalTxtContent: string = '';
  highlightTerms = 'Stand-Up Desks; postură corectă ; Active Zone';

  customPdfHighlights: any[] = [];

  pdfBackendResponse: BackendResponse = {
    type: 'pdf',
    highlights: [
      {
        term: 'Stand-Up Desks',
        page: 1,
        bboxes: [[70, 610, 165, 20]],
      },
      {
        term: 'postură corectă',
        page: 1,
        bboxes: [[95, 540, 150, 18]],
      },
      {
        term: 'Active Zone',
        page: 1,
        bboxes: [
          [95, 500, 55, 18],
          [95, 480, 55, 18],
        ],
      },
      {
        term: 'Violet/Plum Room',
        page: 3,
        bboxes: [[320, 610, 140, 20]],
      },
    ],
  };

  txtBackendResponse: BackendResponse = {
    type: 'txt',
    highlights: [
      {
        term: 'Stand-Up Desks',
        startIndex: 3,
        endIndex: 17,
      },
      {
        term: 'postură corectă',
        startIndex: 184,
        endIndex: 199,
      },
      {
        term: 'Active Zone',
        startIndex: 355,
        endIndex: 366,
      },
    ],
  };

  docxBackendResponse: BackendResponse = {
    type: 'pdf',
    pdfBase64: 'docx converted to base64 pdf string here',
    highlights: [
      {
        term: 'Stand-Up Desks',
        page: 1,
        bboxes: [[70, 610, 165, 20]],
      },
      {
        term: 'postură corectă',
        page: 1,
        bboxes: [[95, 540, 150, 18]],
      },
      {
        term: 'Active Zone',
        page: 1,
        bboxes: [
          [95, 500, 55, 18],
          [95, 480, 55, 18],
        ],
      },
      {
        term: 'Violet/Plum Room',
        page: 3,
        bboxes: [[320, 610, 140, 20]],
      },
    ],
  };

  savedHighlights = [];
  colorNo = 1;

  @ViewChild(NgxExtendedPdfViewerComponent)
  private pdfViewer!: NgxExtendedPdfViewerComponent;
  constructor(public fileService: FileService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.setFile(file);
  }

  onPdfLoaded() {
    this.viewerReady = true;
  }

  async setFile(file: File) {
    if (file) {
      this.errorMessage = '';

      if (file.size > this.FILE_MAX_SIZE) {
        this.errorMessage =
          'Fisierul este prea mare, dimensiunea maxima este de 5MB';
      } else if (
        ![
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/pdf',
          'text/plain',
          'text/html',
        ].includes(file.type)
      ) {
        this.errorMessage = 'Formatul fisierului este invalid';
      } else {
        this.file = file;

        switch (file.type) {
          case 'application/pdf':
            this.fileViewer = 'pdf-viewer';
            this.viewerReady = false;
            this.fileBase64 = await this.fileService.getBase64(this.file);
            const x = this.fileBase64;
            break;
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            this.fileViewer = 'doc-viewer';
            this.fileURL = window.URL.createObjectURL(this.file);
            this.originalDocxHtml = null;
            break;
          case 'text/plain':
          case 'text/html':
            this.fileViewer = 'txt-viewer';
            const text = await this.fileService.getTextFile(this.file);
            this.fileText = text; // neaparat in css trebuie setat white-space: pre-wrap; !
            this.originalTxtContent = text;
            break;
        }
      }
    }
  }

  // 1. Highlight multiple terms
  highlight() {
    const terms = this.highlightTerms.split(';').map((t) => t.trim());
    switch (this.fileViewer) {
      case 'pdf-viewer':
        this.highlightMultiplePdf(terms);
        break;
      case 'doc-viewer':
        this.highlightMultipleDocx(terms);
        break;
      case 'txt-viewer':
        this.highlightMultipleTxt(terms);
        break;
    }
  }

  async highlightMultiplePdf(terms: string[]) {
    if (!this.viewerReady || !PDFViewerApplication) return;

    this.resetPdfHighlight();
    this.savedHighlights = [];

    for (let i = 0; i < terms.length; i++) {
      const term = terms[i];
      const colorIndex = i % this.colorNo;

      await this.extractPdfHighlights(term, colorIndex);
    }

    this.redrawPdfOverlays();
  }

  async extractPdfHighlights(term: string, colorIndex: number) {
    PDFViewerApplication.eventBus.dispatch('find', {
      type: 'find',
      query: term,
      highlightAll: true,
      caseSensitive: false,
      phraseSearch: true,
    });

    await this.sleep(80);
    const pages = document.querySelectorAll('.page');

    pages.forEach((pageDiv: HTMLElement) => {
      const page = Number(pageDiv.dataset['pageNumber']);
      const textLayer = pageDiv.querySelector('.textLayer');
      if (!textLayer) return;

      const presentationSpans = Array.from(
        textLayer.querySelectorAll('span[role="presentation"]')
      ) as HTMLElement[];

      presentationSpans.forEach((span, index) => {
        const fullHighlight = span.classList.contains('highlight');
        const innerHighlight = span.querySelector('.highlight');

        if (!fullHighlight && !innerHighlight) return;

        this.savedHighlights.push({
          page,
          index,
          colorIndex,
          mode: fullHighlight ? 'full' : 'partial',
          innerHtml: span.innerHTML,
        });
      });
    });
  }

  redrawPdfOverlays() {
    this.savedHighlights.forEach((h) => {
      const pageDiv = document.querySelector(
        `.page[data-page-number="${h.page}"]`
      );
      if (!pageDiv) return;

      const textLayer = pageDiv.querySelector('.textLayer');
      if (!textLayer) return;

      const presentationSpans = Array.from(
        textLayer.querySelectorAll('span[role="presentation"]')
      ) as HTMLElement[];

      const target = presentationSpans[h.index];
      if (!target) return;

      if (h.mode === 'full') {
        target.classList.add('highlight', `highlight-${h.colorIndex}`);
      } else {
        target.innerHTML = h.innerHtml;
        target.classList.add(`highlight-${h.colorIndex}`);
      }
    });
  }

  resetPdfHighlight() {
    document
      .querySelectorAll(
        '.highlight-0, .highlight-1, .highlight-2, .highlight-3, .highlight'
      )
      .forEach((el) => {
        if (!el.classList.contains('highlight')) {
          const innerHighlight = el.querySelector('.highlight');
          if (innerHighlight) {
            el.innerHTML = el.innerHTML.replace(
              innerHighlight.outerHTML,
              innerHighlight.textContent || ''
            );
          }
        }
        el.classList.remove(
          'highlight',
          'highlight-0',
          'highlight-1',
          'highlight-2',
          'highlight-3'
        );
      });
  }

  sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  highlightMultipleDocx(terms: string[]) {
    const container = document.querySelector('.doc-viewer');
    if (!container) return;

    this.resetDocxHighlight();

    const normalizedTerms = terms.map((t) => this.normalize(t));

    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const originalText = node.textContent || '';
        const normalizedText = this.normalize(originalText);
        let parent = node.parentNode;
        if (!parent) return;

        let indexFound = -1;
        let matchedTerm = '';
        let matchedTermIndex = -1; // pentru culoare din modulo

        normalizedTerms.forEach((term, i) => {
          const idx = normalizedText.toLowerCase().indexOf(term.toLowerCase());
          if (idx >= 0 && (indexFound === -1 || idx < indexFound)) {
            indexFound = idx;
            matchedTerm = terms[i];
            matchedTermIndex = i;
          }
        });

        if (indexFound >= 0) {
          const before = originalText.slice(0, indexFound);
          const match = originalText.slice(
            indexFound,
            indexFound + matchedTerm.length
          );
          const after = originalText.slice(indexFound + matchedTerm.length);

          const mark = document.createElement('mark');
          const colorIndex = matchedTermIndex % this.colorNo;
          mark.classList.add('highlight', `highlight-${colorIndex}`);
          mark.textContent = match;

          parent.insertBefore(document.createTextNode(before), node);
          parent.insertBefore(mark, node);
          parent.insertBefore(document.createTextNode(after), node);
          parent.removeChild(node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach((child) => walk(child));
      }
    };

    walk(container);
  }

  normalize(text: string): string {
    return text
      .replace(/„|”/g, '"') // înlocuiește ghilimelele românești
      .replace(/&amp;/g, '&') // decodare manuală
      .replace(/\s+/g, ' ') // spații compacte
      .trim();
  }

  resetDocxHighlight() {
    const container = document.querySelector('.doc-viewer');
    if (container) {
      if (!this.originalDocxHtml) {
        this.originalDocxHtml = container.innerHTML;
      }
      container.innerHTML = this.originalDocxHtml;
    }
  }

  highlightMultipleTxt(terms: string[]) {
    this.resetTxtHighlight();
    let content = this.fileText;

    terms.forEach((term, i) => {
      const colorIndex = i % this.colorNo;

      const safe = term
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const safePattern = safe.replace(/\n+/g, '\\s+');
      const regex = new RegExp(safePattern, 'gi');

      content = content.replace(
        regex,
        () => `<mark class="highlight highlight-${colorIndex}">${term}</mark>`
      );
    });

    this.fileText = content;
  }

  resetTxtHighlight() {
    this.fileText = this.originalTxtContent;
  }

  resetAllHighlights() {
    this.resetPdfHighlight();
    this.resetDocxHighlight();
    this.resetTxtHighlight();
  }

  // 2. Apply backend highlights

  async applyBackendHighlights() {
    const response = this.pdfBackendResponse;

    this.clearAllHighlights();

    if (response.type === 'pdf') {
      if (response.pdfBase64) {
        this.viewerReady = false;
        this.fileViewer = 'pdf-viewer';
        this.fileBase64 = response.pdfBase64;
        await this.waitForPdfToLoad();
      }
      this.applyPdfHighlights(response.highlights as PdfHighlight[]);
    } else if (response.type === 'txt') {
      this.applyTxtHighlights(response.highlights as TextHighlight[]);
    }
  }

  waitForPdfToLoad(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (this.viewerReady && PDFViewerApplication?.pdfViewer) {
          resolve();
        } else setTimeout(check, 30);
      };
      check();
    });
  }

  applyPdfHighlights(items: PdfHighlight[]) {
    items.forEach((item, i) => {
      const colorIndex = i % this.colorNo;
      item.bboxes.forEach((bbox) => {
        this.drawBoundingBox(item.page, bbox, colorIndex);
      });
    });
  }

  async drawBoundingBox(
    page: number,
    bbox: [number, number, number, number],
    colorIndex: number
  ) {
    const pageView = PDFViewerApplication.pdfViewer.getPageView(page - 1);

    if (!pageView) return;

    const pdfPage = pageView.pdfPage;
    const scale = PDFViewerApplication.pdfViewer.currentScale;
    const viewport = pdfPage.getViewport({ scale });

    const [left, top, width, height] = bbox;

    const rect = viewport.convertToViewportRectangle([
      left,
      top,
      left + width,
      top + height,
    ]);

    const cssLeft = Math.min(rect[0], rect[2]);
    const cssTop = Math.min(rect[1], rect[3]);
    const cssWidth = Math.abs(rect[0] - rect[2]);
    const cssHeight = Math.abs(rect[1] - rect[3]);

    // textLayer
    const textLayer = pageView.div.querySelector('.textLayer');
    if (!textLayer) return;

    const div = document.createElement('div');
    div.classList.add('pdf-highlight', `highlight-${colorIndex}`);

    div.style.position = 'absolute';
    div.style.left = `${cssLeft}px`;
    div.style.top = `${cssTop}px`;
    div.style.width = `${cssWidth}px`;
    div.style.height = `${cssHeight}px`;
    div.style.pointerEvents = 'none';

    textLayer.appendChild(div);
  }

  applyTxtHighlights(items: TextHighlight[]) {
    let text = this.originalTxtContent;

    items.forEach((h, i) => {
      const colorIndex = i % 4;

      const before = text.slice(0, h.startIndex);
      const match = text.slice(h.startIndex, h.endIndex);
      const after = text.slice(h.endIndex);

      text = `${before}<mark class="highlight highlight-${colorIndex}">${match}</mark>${after}`;
    });

    this.fileText = text;
  }

  clearAllHighlights() {
    // PDF
    document.querySelectorAll('.pdf-highlight').forEach((el) => el.remove());

    // TXT
    if (this.originalTxtContent) {
      this.fileText = this.originalTxtContent;
    }
  }
}
