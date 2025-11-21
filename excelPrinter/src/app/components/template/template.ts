import { Component, Input } from '@angular/core';
import { TempData } from '../../interfaces/temp-data';
import { environment } from '../../../environments/environment.model';
import { ShowQRComponent } from "../../../shared/show-qrcomponent/show-qrcomponent";

@Component({
  selector: 'app-template',
  imports: [ShowQRComponent],
  templateUrl: './template.html',
  styleUrl: './template.css',
})
export class Template {
@Input() data : TempData ={qrData : "xxx-xxx-xxx-xx"};
qrLogoPath:string = environment.logoUrl;
qrMessageAr:string = environment.qrMessageAr;
qrMessageEn:string = environment.qrMessageEn;
}
