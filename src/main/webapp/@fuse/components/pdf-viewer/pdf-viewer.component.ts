import { Component, Input } from '@angular/core';

@Component({
  selector: 'brm-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  /**
   * The link of the PDF to be rendered
   */
  @Input() src!: string;

  /**
   * To make the text of PDF selectable
   * Default - true
   */
  @Input() enableRenderText: boolean = true;
  @Input() renderTextMode: number = 1;

  /**
   * Height and Width of the PDF viewer
   * BrmDefault height - 80vh
   * BrmDefault width - 100%
   */
  @Input() height: string = '75vh';
  @Input() width: string = '95vw';

  /**
   * This will make the PDF render in different angles(Use degree units - 45, 90, 180, etc)
   */
  @Input() rotation: number = 0;

  /**
   * To show a shadowed-border around the PDF
   * BrmDefault - true
   */
  @Input() showBorders: boolean = true;

  /**
   * To zoom in/out
   * Default - 1
   */
  @Input() zoom: number = 1;
}
