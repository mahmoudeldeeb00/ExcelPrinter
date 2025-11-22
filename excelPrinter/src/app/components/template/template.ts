import { Component, Input } from '@angular/core';
import { TempData } from '../../interfaces/temp-data';
import { environment } from '../../../environments/environment.model';
import { ShowQRComponent } from "../../../shared/show-qrcomponent/show-qrcomponent";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  imports: [ShowQRComponent , CommonModule],
  templateUrl: './template.html',
  styleUrl: './template.css',
})
export class Template {
@Input() data : TempData ={qrData : "DM2-TRN-WSB-00091"};
@Input() printMode : number = 1 ;
qrLogoPath:string = environment.logoUrl;
qrMessageAr:string = environment.qrMessageAr;
qrMessageEn:string = environment.qrMessageEn;
}
