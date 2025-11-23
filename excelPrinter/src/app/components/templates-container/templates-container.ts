import { Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { TempData } from '../../interfaces/temp-data';
import { Template } from "../template/template";
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { Progressdownladpdf } from '../progressdownladpdf/progressdownladpdf';
import html2canvas from 'html2canvas';
import * as svg2pdf from 'svg2pdf.js';

@Component({
  selector: 'app-templates-container',
  imports: [Template, NgStyle],
  templateUrl: './templates-container.html',
  styleUrl: './templates-container.css',
})
export class TemplatesContainer implements OnInit, OnChanges {
  @Input() data: TempData[] = [];
  @Input() printMode: number = 1;
 
  groups: number[] = [1];

  @ViewChild('devContent') devContent!: ElementRef;
  dialogRef: any;
  currentIndex: number = 0;
  progressData: any = { current: 0, all: 0, label: 'File No.' };
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.handleChangeData();
  }

  ngOnChanges(): void {
    this.handleChangeData();
  }

  handleChangeData() {
    this.groups = [];
    let n = this.numberOfRows(this.data.length, this.printMode == 1 ? 4:2);
    for (let i = 1; i <= n; i++) {
      this.groups.push(i);
    }
    console.log('this.groups', this.groups)
  }
printDiv() {
  const element = document.getElementById('printDiv');
  if (!element) {
    console.error('Element not found');
    return;
  }
  window.print();
}

  downloadPDF(each:0) {
      this.printDiv();
  }

  numberOfRows(n: number, perRow: number = 6): number {
    return Math.ceil(n / perRow);
  }


  skipTake<T>(arr: T[], skip: number, take: number): T[] {
    return arr.slice(skip, skip + take);
  }

}
