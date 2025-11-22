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
  printMode:number = 1;
  data:TempData[] = [
    {qrData : "DM2-TRN-WSB-00000"},

  ]

  fetchDataFromExcel(_data:TempData[]){
    console.log('fetch Data  From Excel :::',_data)
    this.data = _data;
  }
  pdfFunc(event:any){

    this.printMode = event.printMode??1;
    console.log('event : ', event)
    if(event?.print){
      this.tempsComp.downloadPDF(event.eachPage)

    }
  
  }
}
