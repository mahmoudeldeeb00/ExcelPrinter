import { Component, EventEmitter, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { TempData } from '../../interfaces/temp-data';
import { DropzoneDirective } from '../../directives/dropzone-directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading-service/loading-service';

@Component({
  selector: 'app-entration-form-component',
  imports: [DropzoneDirective, CommonModule, FormsModule],
  templateUrl: './entration-form-component.html',
  styleUrl: './entration-form-component.css',
})
export class EntrationFormComponent {
  @Output() excelDataEmitter = new EventEmitter<TempData[]>();
  @Output() pdfEmitter = new EventEmitter<boolean>();
    constructor(private _loadingService : LoadingService){
      
    }
  excelInfo: any = {
    fileName: '',
    count: 0,
    start: '',
    end: '',
    eachPage: 0,
    printMode: 1,
    print: false
  }

  list: TempData[] = [];

  runTheProcess(sheetData: any[][], _fileName: string) {
    this.list = [];
    this.excelInfo.fileName = _fileName;

    for (let i = 1; i < sheetData.length; i++) {
      const cell = sheetData[i]?.[0];
      this.list.push({ qrData: cell ?? null });
    }

    if (this.list.length > 0) {
      this.excelInfo.count = this.list.length;
      this.excelInfo.start = this.list[0].qrData;
      this.excelInfo.end = this.list[this.list.length - 1].qrData;
      this.excelInfo.eachPage = this.numberOfRows(this.excelInfo.count);
    }

    this.excelDataEmitter.emit(this.list);
    this.excelInfo.print = false;
    this.pdfEmitter.emit(this.excelInfo);
    this._loadingService.hideloader()

  }

  changeMode(mode: number) {
    this._loadingService.showLoader()
    setTimeout(( )=>{
 this.excelInfo.printMode = mode;
    this.excelInfo.print = false;
    console.log('Mode changed to:', mode);
    this.pdfEmitter.emit(this.excelInfo);
    this._loadingService.hideloader()
     },500)
   

  }

  handleEachPage() {
    if (this.list?.length) {
      let nopages = this.numberOfRows(this.list.length);
      if (this.excelInfo.eachPage > nopages) {
        this.excelInfo.eachPage = nopages;
      }
      this.excelInfo.print = false;
      this.pdfEmitter.emit(this.excelInfo);
    }
  }

  pdfFunc() {
    console.log('pdfFunc - Current list length:', this.list.length);
    console.log('pdfFunc - eachPage value:', this.excelInfo.eachPage);

    // التأكد من أن eachPage ليس صفر
    if (!this.excelInfo.eachPage || this.excelInfo.eachPage === 0) {
      this.excelInfo.eachPage = this.numberOfRows(this.list.length);
    }

    console.log('pdfFunc - Final eachPage:', this.excelInfo.eachPage);

    this.excelInfo.print = true;
    this.pdfEmitter.emit(this.excelInfo);
  }

  numberOfRows(n: number, perRow: number = 6): number {
    return Math.ceil(n / perRow);
  }

  onFileDropped(file: File) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.xlsx') && !file.name.toLowerCase().endsWith('.xls')) {
      alert('Please drop a valid Excel file!');
      return;
    }
    
    this._loadingService.showLoader()
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const arrayBuffer = e.target.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const wb: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
      this.runTheProcess(sheetData, file.name);
    };
    reader.readAsArrayBuffer(file);
  }

  onFileChange(event: any) {

    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) return;
    this._loadingService.showLoader()

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
      this.runTheProcess(data, event.target.files[0].name);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
