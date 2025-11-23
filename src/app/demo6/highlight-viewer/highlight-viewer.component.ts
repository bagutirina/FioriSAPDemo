import { Component, ViewChild } from '@angular/core';
import { renderAsync } from 'docx-preview';
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

  @ViewChild(NgxExtendedPdfViewerComponent)
  private viewer!: NgxExtendedPdfViewerComponent;
  constructor(public fileService: FileService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.setFile(file);
  }

  async setFile(file: File) {
    if (file) {
      const typeSplit = file.type.split('/');
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
            const arrayBuffer = await file.arrayBuffer();
            const container = document.getElementById('preview-container');
            try {
              await renderAsync(arrayBuffer, container, undefined, {
                className: 'docx',
                inWrapper: true,
              });
              this.originalDocxHtml = container.innerHTML;
            } catch (err) {}
            break;
          case 'text/plain':
          case 'text/html':
            this.fileViewer = 'txt-viewer';
            const text = await this.fileService.getTextFile(this.file);
            this.fileText = text.replace(new RegExp('\r?\n', 'g'), '<br />');
            this.originalTxtContent = this.fileText;
            break;
        }
      }
    }
  }

  onPdfLoaded() {
    this.viewerReady = true;
  }

  highlight(term: string) {
    switch (this.fileViewer) {
      case 'pdf-viewer':
        this.highlightPdf(term);
        break;
      case 'doc-viewer':
        this.highlightDocx(term);
        break;
      case 'txt-viewer':
        this.highlightTxt(term);
        break;
    }
  }

  highlightPdf(term: string) {
    // handled by ngx-extended-pdf-viewer
    if (!this.viewerReady || !term || !PDFViewerApplication) {
      console.warn('Viewer not ready or empty term');
      return;
    }

    PDFViewerApplication.eventBus.dispatch('find', {
      type: 'find',
      query: term,
      caseSensitive: false,
      highlightAll: true,
      phraseSearch: true,
    });
  }

  highlightDocx(term: string) {
    const container = document.getElementById('preview-container');
    if (!container) return;

    // Escape pentru regex
    const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safeTerm, 'gi');

    // Înlocuire cu highlight
    container.innerHTML = this.originalDocxHtml.replace(
      regex,
      (match) => `<mark class="highlight">${match}</mark>`
    );
  }

  highlightTxt(term: string) {
    const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safeTerm, 'gi');

    this.fileText = this.originalTxtContent.replace(
      regex,
      (match) => `<mark class="highlight">${match}</mark>`
    );
  }
}
