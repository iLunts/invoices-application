import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.less'],
})
export class SignaturePadComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) signaturePadElement;
  @Output() result = new EventEmitter<string>();
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;
  signatureBase64: string;

  constructor(
    private elementRef: ElementRef,
    private _modal: ModalController // private base64ToGallery: Base64ToGallery
  ) {}

  ngOnInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    if (window.innerWidth < window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 140;
    }
    // canvas.height = window.innerHeight - 300;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(
      this.signaturePadElement.nativeElement
    );
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(56,128,255)';
  }

  save(): void {
    if (!this.signaturePad.isEmpty()) {
      const img = this.signaturePad.toDataURL();
      // const img = this.signaturePad.toDataURL('image/svg+xml');
      this.signatureBase64 = img;
      this.result.emit(img);
      this.dismissModal();
      // this.base64ToGallery.base64ToGallery(img).then(
      //   (res) => console.log('Saved image to gallery ', res),
      //   (err) => console.log('Error saving image to gallery ', err)
      // );
    } else {
      console.log('Signature is empty!');
    }
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  dismissModal() {
    this._modal.dismiss({ signature: this.signatureBase64 });
  }

  checkSign() {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty();
    } else {
      return false;
    }
  }
}
