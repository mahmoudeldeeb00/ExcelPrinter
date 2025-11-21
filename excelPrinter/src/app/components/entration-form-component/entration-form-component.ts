import { Component, EventEmitter, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { TempData } from '../../interfaces/temp-data';

@Component({
  selector: 'app-entration-form-component',
  imports: [],
  templateUrl: './entration-form-component.html',
  styleUrl: './entration-form-component.css',
})
export class EntrationFormComponent {
  @Output() excelDataEmitter = new EventEmitter<TempData[]>(); // ⚡ EventEmitter لل parent

 list: TempData[] = [];


   onFileChange(event: any) {
    this.list = [];
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) return;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
      for(let i = 1 ; i< data.length ; i++){
        this.list.push({qrData : data[i][0]})
      }
      this.excelDataEmitter.emit(this.list)
    };
    reader.readAsBinaryString(target.files[0]);
  }






}
