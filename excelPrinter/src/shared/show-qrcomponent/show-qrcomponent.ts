import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import QRCode from 'qrcode';

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


 ngOnInit() {
    QRCode.toDataURL(this.qrCodeData)
      .then(url => this.qrImage = url);
  }



}
