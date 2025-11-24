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
  highlightTerm = '';
  termsToHighlight = ['Stand-Up Desks', 'postură corectă', 'Active Zone'];

  @ViewChild(NgxExtendedPdfViewerComponent)
  private viewer!: NgxExtendedPdfViewerComponent;
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
            // file => base64 => pdf-viewer
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

  highlight(terms: string[]) {
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

  highlightMultiplePdf(terms: string[]) {
    if (!this.viewerReady || !PDFViewerApplication) {
      console.warn('PDF not ready');
      return;
    }

    terms.forEach((term) => {
      PDFViewerApplication.eventBus.dispatch('find', {
        type: 'find',
        query: term,
        highlightAll: true,
        caseSensitive: false,
        phraseSearch: true,
      });
    });
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
          const colorIndex = matchedTermIndex % 4; // → highlight-0..3
          mark.className = `highlight-${colorIndex}`;
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
    let content = this.originalTxtContent;

    terms.forEach((term, i) => {
      const colorIndex = i % 4; // ← AICI se face ciclarea culorilor

      const safe = term
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const safePattern = safe.replace(/\n+/g, '\\s+');
      const regex = new RegExp(safePattern, 'gi');

      content = content.replace(
        regex,
        () => `<mark class="highlight-${colorIndex}">${term}</mark>`
      );
    });

    this.fileText = content;
  }
}
