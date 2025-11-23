import { Component, ViewChild } from '@angular/core';
import { EntrationFormComponent } from "../entration-form-component/entration-form-component";
import { TemplatesContainer } from "../templates-container/templates-container";
import { TempData } from '../../interfaces/temp-data';

@Component({
  selector: 'app-home-page',
  imports: [EntrationFormComponent, TemplatesContainer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  @ViewChild(TemplatesContainer) tempsComp!: TemplatesContainer;
  printMode: number = 1;
  data: TempData[] = [
    { qrData: "DM2-TRN-WSB-00000" },
  ]

  fetchDataFromExcel(_data: TempData[]) {
    console.log('fetchDataFromExcel - received data:', _data.length, 'records');
    this.data = _data;
  }

  pdfFunc(event: any) {
    this.printMode = event.printMode ?? 1;
    console.log('pdfFunc called with event:', event);
    console.log('Current data length:', this.data.length);

    if (event?.print) {
      // إضافة تأخير لضمان تحديث الـ DOM قبل الطباعة
      setTimeout(() => {
        console.log('Starting PDF generation...');
        this.tempsComp.downloadPDF(event.eachPage);
      }, 500);
    }
  }
}
