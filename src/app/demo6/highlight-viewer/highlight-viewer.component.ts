import { Component } from '@angular/core';
import { renderAsync } from 'docx-preview';
import { FileService } from 'src/app/services/file.service';

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
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            this.fileViewer = 'doc-viewer';
            const arrayBuffer = await file.arrayBuffer();
            const container = document.getElementById('preview-container');
            try {
              await renderAsync(arrayBuffer, container, undefined, {
                className: 'docx',
                inWrapper: true,
              });
            } catch (err) {}
            break;
          case 'application/pdf':
            this.fileViewer = 'pdf-viewer';
            // file => base64 => pdf-viewer
            this.fileBase64 = await this.fileService.getBase64(this.file);
            const x = this.fileBase64;
            break;
          case 'text/plain':
          case 'text/html':
            this.fileViewer = 'txt-viewer';
            const text = await this.fileService.getTextFile(this.file);
            this.fileText = text.replace(new RegExp('\r?\n', 'g'), '<br />');
            break;
        }
      }
    }
  }

  // --- loading viewers
  // pdf-viewer
  pdfViewerLoaded($event) {
    setTimeout(() => {
      this.textRenderedElements = [
        ...(this.textRenderedElements || []),
        ...$event.source.textDivs,
      ];
    }, 0);
  }

  // doc-viewer, txt-viewer
  viewerLoaded() {
    if (['doc-viewer', 'txt-viewer'].includes(this.fileViewer)) {
      let viewerElement;
      this.timeIntervalViewerLoaded = setInterval(() => {
        let elems;
        if (this.fileViewer === 'doc-viewer') {
          viewerElement = document?.querySelector('.doc-viewer > div');
          elems = viewerElement?.querySelectorAll(
            ':scope > p, :scope > h1, :scope > h2, :scope > h3, :scope > ul > li'
          );
        } else if (this.fileViewer === 'txt-viewer') {
          viewerElement = document?.querySelector('.txt-viewer');
          elems = [viewerElement];
        }

        if (viewerElement) {
          clearInterval(this.timeIntervalViewerLoaded);
          setTimeout(() => {
            this.textRenderedElements = elems;
          }, 0);
        }
      }, 1000);
    }
  }
}
