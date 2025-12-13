import { Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { TempData } from '../../interfaces/temp-data';
import { Template } from "../template/template";
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { Progressdownladpdf } from '../progressdownladpdf/progressdownladpdf';
import html2canvas from 'html2canvas';
import * as svg2pdf from 'svg2pdf.js';
import { LoadingService } from '../../services/loading-service/loading-service';
import { environment } from '../../../environments/environment.model';

@Component({
  selector: 'app-templates-container',
  imports: [Template, NgStyle],
  templateUrl: './templates-container.html',
  styleUrl: './templates-container.css',
})
export class TemplatesContainer implements OnInit, OnChanges {
  @Input() data: TempData[] = [];
  @Input() printMode: number = 1;
  @ViewChild('devContent') devContent!: ElementRef;
  
  dialogRef: any;
  currentIndex: number = 0;
  progressData: any = { current: 0, all: 0, label: 'File No.' };
  colorSheetWidthInmm = environment.colorSheetWidthInmm;
  colorSheetHeightInmm = environment.colorSheetHeightInmm;
  colorOneTemplateWidthInmm = environment.colorOneTemplateWidthInmm;
  colorSheetCountInPage = environment.colorSheetCountInPage;
  blackWhiteSheetWidthInmm = environment.blackWhiteSheetWidthInmm;
  blackWhiteSheetHeightInmm = environment.blackWhiteSheetHeightInmm;
  blackWhiteOneTemplateWidthInmm = environment.blackWhiteOneTemplateWidthInmm;
  blackWhiteSheetCountInPage = environment.blackWhiteSheetCountInPage;

  groups: number[] = [1];


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dialog: MatDialog , private _load : LoadingService) { }

  ngOnInit(): void {
    this.handleChangeData();
  }

  ngOnChanges(): void {
    this.handleChangeData();
  }

  handleChangeData() {
    this.groups = [];
    let n = this.numberOfRows(this.data.length, this.printMode == 1 ? this.colorSheetCountInPage:this.blackWhiteSheetCountInPage);
    for (let i = 1; i <= n; i++) {
      this.groups.push(i);
    }
  
  }
printDiv() {
  const element = document.getElementById('printDiv');
  if (!element) {
    console.error('Element not found');
    return;
  }
  window.print();
}

  downloadPDF() {
      this.printDiv();
  }

  numberOfRows(n: number, perRow: number = 6): number {
    return Math.ceil(n / perRow);
  }

  getArrayFromNumber(length: number):number[]{
    return Array.from({ length: length })
  }
  skipTake<T>(arr: T[], skip: number, take: number): T[] {
    return arr.slice(skip, skip + take);
  }


}
