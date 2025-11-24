import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
//import QRCode from 'qrcode';
import ImageTracer from 'imagetracerjs';
import QRCode from 'qrcode-generator';

@Component({
  selector: 'app-show-qrcomponent',
    standalone:true,
  imports: [],
  templateUrl: './show-qrcomponent.html',
  styleUrl: './show-qrcomponent.css',
})
export class ShowQRComponent implements OnInit , AfterViewInit ,AfterViewChecked {
  @Input() qrCodeData : string ="xxxx-xxxx-xxxx-xxxx";
  @Input() qrDataUrl : string ="xxxx-xxxx-xxxx-xxxx";
  @Input() qrScale : number =8;
  qrImage = '';
  @ViewChild('qrImgRef') qrImg!: ElementRef<HTMLImageElement>;

  constructor(private el: ElementRef){}
  ngAfterViewChecked(): void {
      //this.generateQR()
  }
  ngAfterViewInit(): void {
    this.generateQR()
  }



 ngOnInit() {


  // QRCode.toString(this.qrCodeData, { type: 'svg', margin: 1 })
  // .then(svgCode => {
  //   // حوّل الـ SVG لنوع Blob
  //   const blob = new Blob([svgCode], { type: 'image/svg+xml' });

  //   // اعمل URL للـ Blob
  //   const url = URL.createObjectURL(blob);

  //   // حط الـ URL في صورة <img>
  //   const img = this.el.nativeElement.querySelector('#qrImg');
  //   img.src = url;
  // })
  // .catch(err => console.error(err));

      // QRCode.toString(this.qrCodeData, { type: 'svg' , margin: 1  })
      // .then(svgCode => {
      //  ///require('fs').writeFileSync('qr.svg', svgCode);
      //   this.el.nativeElement.querySelector('#divdiv').innerHTML = svgCode;
      // })
      // .catch(err => console.error(err));
  }
  generateQR() {
  const qr = QRCode(0, 'M');  // auto size + medium error correction
  qr.addData(this.qrCodeData);
  qr.make();

  const count = qr.getModuleCount();
  //const scale = 4; // حجم كل مربع
  const scale =this.qrScale; // حجم كل مربع

  let svg = `<svg xmlns="http://www.w3.org/2000/svg"
                  width="${count * scale}"
                  height="${count * scale}"
                  shape-rendering="crispEdges">`;

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        svg += `<rect x="${c * scale}" y="${r * scale}" width="${scale}" height="${scale}" fill="#000" />`;
      }
    }
  }

  svg += `</svg>`;
   this.el.nativeElement.querySelector('#qr-'+ this.qrCodeData).innerHTML = svg
 // const blob = new Blob([svg], { type: 'image/svg+xml' });
 // this.qrImg.nativeElement.src = URL.createObjectURL(blob);
}
  }



