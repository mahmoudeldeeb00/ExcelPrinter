import { Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { TempData } from '../../interfaces/temp-data';
import { Template } from "../template/template";
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { Progressdownladpdf } from '../progressdownladpdf/progressdownladpdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-templates-container',
  imports: [Template, NgStyle],
  templateUrl: './templates-container.html',
  styleUrl: './templates-container.css',
})
export class TemplatesContainer implements OnInit, OnChanges {
  @Input() data: TempData[] = [];
  @Input() printMode: number = 1;
  filterData: TempData[] = [];
  groups: number[] = [1];

  @ViewChild('devContent') devContent!: ElementRef;
  dialogRef: any;
  currentIndex: number = 0;
  progressData: any = { current: 0, all: 0, label: 'File No.' };

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.handleChangeData(0, 1);
  }

  ngOnChanges(): void {
    this.handleChangeData(0, 1);
  }

  handleChangeData(skip: number, take: number) {
    console.log('handleChangeData called:', { skip, take, dataLength: this.data.length });

    this.filterData = this.skipTake(this.data, skip * 6, take * 6);

    console.log('filterData length:', this.filterData.length);

    this.groups = [];
    let n = this.numberOfRows(this.filterData.length, 6);

    console.log('Number of groups:', n);

    for (let i = 1; i <= n; i++) {
      this.groups.push(i);
    }
  }

  async print(pageNumber: number, each: number): Promise<void> {
    const receiptElement = document.getElementById('printDiv');
    if (!receiptElement) return;
    if (isPlatformBrowser(this.platformId)) {
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
        precision: 16
      });

      const divs: HTMLElement[] = Array.from(document.querySelectorAll('.pdf-div'));

      this.progressData.all = divs.length;
      let fileName = `File No. ${pageNumber}`;

      this.progressData.label = fileName;
      const processDiv = (index: number): Promise<void> => {
        return new Promise((resolve) => {
          if (index >= divs.length) {
            try {
              pdf.save(`${fileName}.pdf`);
            } catch { }
            resolve();
            return;
          }

          const element = divs[index];
          this.currentIndex = index;
          this.progressData.current = this.currentIndex;

          if (this.dialogRef?.componentInstance) {
            this.dialogRef.componentInstance.data = this.progressData;
          }

          html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            logging: false,
            imageTimeout: 0,
            removeContainer: true,
            foreignObjectRendering: false,
            width: element.offsetWidth,
            height: element.offsetHeight
          })
            .then((canvas: HTMLCanvasElement) => {
              const imgData = canvas.toDataURL('image/jpeg', 1.0);

              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();

              pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'NONE');

              if (index < divs.length - 1) {
                pdf.addPage();
              }

              processDiv(index + 1).then(() => resolve());
            })
            .catch((error: any) => {
              console.error('Error generating PDF for div', index, error);
              processDiv(index + 1).then(() => resolve());
            });
        });
      };

      await processDiv(0);
    }
  }

  noOfLevels: number = 0;

  async downloadPdfLevel(eachP: number, level: number) {
    console.log('downloadPdfLevel called:', { eachP, level });

    this.handleChangeData(level - 1, eachP);

    // انتظار تحديث الـ DOM
    await this.delay(1000);

    if (level <= this.noOfLevels) {
      const receiptElement = document.getElementById('printDiv');

      if (!receiptElement) {
        console.error('printDiv not found!');
        return;
      }

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
        precision: 16
      });

      const divs: HTMLElement[] = Array.from(document.querySelectorAll('.pdf-div'));

      console.log('Found divs:', divs.length);

      if (divs.length === 0) {
        console.error('No pdf-div elements found!');
        return;
      }

      this.progressData.all = divs.length;
      let fileName = `File No. ${level}`;
      this.progressData.label = fileName;
      this.progressData.current = 0;
      if (this.dialogRef?.componentInstance) {
        this.dialogRef.componentInstance.data = this.progressData;
      }

      const processDiv = async (index: number) => {
        if (index >= divs.length) {
          console.log('Saving PDF:', fileName);
          pdf.save(`${fileName}.pdf`);
          return;
        }

        const element = divs[index];
        this.currentIndex = index;
        this.progressData.current = this.currentIndex + 1;

        if (this.dialogRef?.componentInstance) {
          this.dialogRef.componentInstance.data = this.progressData;
        }

        try {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            logging: false,
            foreignObjectRendering: false
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95);

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

          if (index < divs.length - 1) {
            pdf.addPage();
          }

          // تنظيف الذاكرة
          canvas.remove();

          await this.delay(100);
          await processDiv(index + 1);
        } catch (error) {
          console.error('Error:', error);
          await processDiv(index + 1);
        }
      };

      await processDiv(0);
    }
  }

  downloadPDF(eachP: number) {
    console.log('downloadPDF called with eachP:', eachP);
    console.log('Data length:', this.data.length);

    this.dialogRef = this.dialog.open(Progressdownladpdf, {
      data: this.progressData,
      width: '80%',
      disableClose: true,
    });

    this.noOfLevels = this.numberOfRows(this.data.length, eachP * 6);
    console.log('Number of levels:', this.noOfLevels);
    this.downloadPdfLevel(eachP, 1)



    // انتظار تحديث الـ DOM قبل البدء
    // setTimeout(() => {
    //   let i = 1;
    //   this.downloadPdfLevel(eachP, i);

    //   if (this.noOfLevels > 1) {
    //     const interval = setInterval(() => {
    //       i++;
    //       this.downloadPdfLevel(eachP, i);
    //       if (i >= this.noOfLevels) {
    //         clearInterval(interval);
    //         setTimeout(() => {
    //           if (this.dialogRef) {
    //             this.dialogRef.close();
    //           }
    //         }, 1000);
    //       }
    //     }, eachP * 2000);
    //   } else {
    //     // إذا كان ملف واحد فقط
    //     // setTimeout(() => {
    //     //   if (this.dialogRef) {
    //     //     this.dialogRef.close();
    //     //   }
    //     // }, 2000);
    //   }
    // }, 5000);
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
