import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { TempData } from '../../interfaces/temp-data';
import { Template } from "../template/template";
import domtoimage from 'dom-to-image-more';
import { isPlatformBrowser } from '@angular/common';

import jsPDF from 'jspdf';
@Component({
  selector: 'app-templates-container',
  imports: [ Template],
  templateUrl: './templates-container.html',
  styleUrl: './templates-container.css',
})
export class TemplatesContainer {
@Input() data :TempData[] =[]

constructor(@Inject(PLATFORM_ID) private platformId: Object){

}
  @ViewChild('devContent') devContent!: ElementRef;
currentIndex : number = -1;

  downloadPDF() {
    // const DATA = this.devContent.nativeElement;

    // html2canvas(DATA, { scale: 2 }).then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF('p', 'mm', 'a4');

    //   // حساب الطول بناءً على أبعاد الصورة
    //   const imgProps = pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   pdf.save('div-content.pdf');
    // });

    
    
      const receiptElement = document.getElementById('printDiv');
      if (!receiptElement) return;
    if (isPlatformBrowser(this.platformId)) {
      if(false){

        import('dom-to-image-more').then(domtoimage => {
          const element = this.devContent.nativeElement;
          
          domtoimage.toPng(element)
          .then((dataUrl: string) => {
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4, عمودي
        const pdfWidth = 210;
        const pdfHeight =297;

        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          const imgWidth = img.width ;

          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth,pdfHeight);
          pdf.save('content.pdf'); // اسم الملف النهائي
        };
      })
      .catch((error: any) => {
        console.error('Error generating PDF', error);
      });
    });
  }
   if(true)  {
     import('dom-to-image-more').then(domtoimage => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const divs: HTMLElement[] = Array.from(document.querySelectorAll('.pdf-div')); // كل div يحمل class واحد

      const processDiv = (index: number) => {
        this.currentIndex = index
        if (index >= divs.length) {
          pdf.save('multi-div-content.pdf');
            this.currentIndex = -1;
          return;
        }

        const element = divs[index];

        domtoimage.toPng(element)
          .then((dataUrl: string) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const ratio = pdfWidth / img.width;
              const imgHeight = img.height * ratio;

              pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);

              // أضف صفحة جديدة إذا لم تكن آخر div
              if (index < divs.length - 1) {
                pdf.addPage();
              }

              processDiv(index + 1); // العملية للـ div التالي
            };
          })
          .catch((error: any) => {
            console.error('Error generating PDF for div', index, error);
            processDiv(index + 1); // تجاهل الخطأ واستمر
          });
      };

      processDiv(0);
    });
   }
    
}}
}
