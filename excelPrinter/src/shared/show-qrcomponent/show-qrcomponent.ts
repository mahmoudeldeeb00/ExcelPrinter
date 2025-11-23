import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import QRCode from 'qrcode';
import ImageTracer from 'imagetracerjs';

@Component({
  selector: 'app-show-qrcomponent',
    standalone:true,
  imports: [],
  templateUrl: './show-qrcomponent.html',
  styleUrl: './show-qrcomponent.css',
})
export class ShowQRComponent implements OnInit {
  @Input() qrCodeData : string ="xxxx-xxxx-xxxx-xxxx";
  @Input() qrCodeWidth : string ="xxxx-xxxx-xxxx-xxxx";
  qrImage = '';
  
  constructor(private el: ElementRef){}


 
 ngOnInit() {
      QRCode.toString(this.qrCodeData, { type: 'svg' , margin: 1 })
      .then(svgCode => {
        this.el.nativeElement.querySelector('#divdiv').innerHTML = svgCode;
      })
      .catch(err => console.error(err));
  }
  }



