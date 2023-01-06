import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerComponent } from './pdf-viewer.component';

@NgModule({
  declarations: [PdfViewerComponent],
  imports: [CommonModule, PdfViewerModule],
  exports: [PdfViewerComponent]
})
export class BrmPdfViewerModule {}
