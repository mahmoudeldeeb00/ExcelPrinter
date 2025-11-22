import { Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { TempData } from '../../interfaces/temp-data';
import { Template } from "../template/template";
import domtoimage from 'dom-to-image-more';
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import jsPDF from 'jspdf';
import { Progressdownladpdf } from '../progressdownladpdf/progressdownladpdf';
@Component({
  selector: 'app-templates-container',
  imports: [Template, NgStyle],
  templateUrl: './templates-container.html',
  styleUrl: './templates-container.css',
})
export class TemplatesContainer implements OnInit , OnChanges{
@Input() data :TempData[] =[];
@Input() printMode :number =1;
 filterData :TempData[] =[];
groups:number[]=[1];

@ViewChild('devContent') devContent!: ElementRef;
dialogRef : any;
currentIndex : number = 0;
progressData : any = {current : 0 , all : 0 , label :'File No.'}; 

constructor(@Inject(PLATFORM_ID) private platformId: Object , private dialog: MatDialog){

}
  ngOnInit(): void {
    this.handleChangeData(1,1);
  }
   ngOnChanges(): void {
    this.handleChangeData(1,1);
  }
  handleChangeData(skip:number , take:number){
    this.filterData =this.skipTake( this.data, skip*6,take*6);
      this.groups = [];
      let n = this.numberOfRows(this.filterData.length ,6)
    for(let i = 1 ; i<=n; i++)
      {
        this.groups.push(i)
      }
  }
 async print(pageNumber: number , each:number): Promise<void> {
  const receiptElement = document.getElementById('printDiv');
  if (!receiptElement) return;
  if (isPlatformBrowser(this.platformId)) {
    const domtoimage = await import('dom-to-image-more');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const divs: HTMLElement[] = Array.from(document.querySelectorAll('.pdf-div'));
    
    this.progressData.all = divs.length;
    let fileName = `File No. ${pageNumber}`;
    
    this.progressData.label = fileName;
    const processDiv = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (index >= divs.length) {
          try {
            pdf.save(`${fileName}.pdf`);
           
          } catch {}
         // this.processPageNumber = pageNumber;
          resolve();
          return;
        }

        const element = divs[index];
        this.currentIndex = index;
        this.progressData.current = this.currentIndex;
        this.dialogRef.componentInstance.data = this.progressData;

        domtoimage.toPng(element)
          .then((dataUrl: string) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const ratio = pdfWidth / img.width;
              const imgHeight = img.height * ratio;

              pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);

              if (index < divs.length - 1) {
                pdf.addPage();
              }

              // ننتظر div التالي
              processDiv(index + 1).then(() => resolve());
            };
          })
          .catch((error: any) => {
            console.error('Error generating PDF for div', index, error);
            // تجاهل الخطأ واستمر
            processDiv(index + 1).then(() => resolve());
          });
      });
    };

    // ننتظر اكتمال كل div
    await processDiv(0);
  }
}   

noOfLevels :number = 0 ;
 async downloadPdfLevel(eachP:number , level:number){
this.handleChangeData(level-1 , eachP)
if(level <= this.noOfLevels){
  const receiptElement = document.getElementById('printDiv');
    const domtoimage = await import('dom-to-image-more');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const divs: HTMLElement[] = Array.from(document.querySelectorAll('.pdf-div'));
    
    this.progressData.all = divs.length;
    let fileName = `File No. ${level}`;
    this.progressData.label = fileName;
    this.progressData.current = this.currentIndex;
    this.dialogRef.componentInstance.data = this.progressData;
    console.log('begin processDiv')
    const processDiv = (index: number ) => {
      return new Promise((resolve) => {
        const element = divs[index];
        this.currentIndex = index;
        this.progressData.current = this.currentIndex;
        this.dialogRef.componentInstance.data = this.progressData;
        if (index >= divs.length) {   
            pdf.save(`${fileName}.pdf`);
          
          return;
        }
        
        domtoimage.toPng(element)
          .then((dataUrl: string) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const ratio = pdfWidth / img.width;
              const imgHeight = img.height * ratio;
              pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);
              if (index < divs.length - 1) {
                pdf.addPage();
              }  
              processDiv(index + 1)
            };
          })
          .catch((error: any) => {
            processDiv(index + 1);
          });
      });
    };

    // ننتظر اكتمال كل div
    await processDiv(0);
  
         
      
 }      
}


   downloadPDF(eachP:number ) {
     this.dialogRef = this.dialog.open(Progressdownladpdf , {
          data: this.progressData,
          width:'80%',
          disableClose: true,
        });

    this.noOfLevels = this.numberOfRows(this.data.length,eachP *6);
    let  i = 1;
      this.downloadPdfLevel(eachP ,i )
    
    const intrerval = setInterval(()=>{
      console.log(' i :: ',i)
      console.log(' noOfLevels :: ',   this.noOfLevels)
      i++;
       this.downloadPdfLevel(eachP ,i )
       if(i == this.noOfLevels){
        clearInterval(intrerval)
       }
    },eachP * 1000)
  
     
        
}

 numberOfRows(n: number, perRow: number = 6): number {
  return Math.ceil(n / perRow);
}
async delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
skipTake<T>(arr: T[], skip: number, take: number): T[] {
  return arr.slice(skip, skip + take);
}
}
