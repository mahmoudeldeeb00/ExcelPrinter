import { Component } from '@angular/core';
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


  data:TempData[] = [
    {qrData : "1-xxxx-1-xxxxxx"}
  ]

  fetchDataFromExcel(_data:TempData[]){
    console.log('fetch Data  From Excel :::',_data)
    this.data = _data;
  }
}
