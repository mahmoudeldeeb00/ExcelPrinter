import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { TempData } from '../../interfaces/temp-data';
import { environment } from '../../../environments/environment.model';
import { ShowQRComponent } from "../../../shared/show-qrcomponent/show-qrcomponent";
import { CommonModule } from '@angular/common';
import { Logo1svg } from "../../../shared/logo1svg/logo1svg";
import { Logo2svg } from "../../../shared/logo2svg/logo2svg";

@Component({
  selector: 'app-template',
  imports: [ShowQRComponent, CommonModule, Logo1svg, Logo2svg],
  templateUrl: './template.html',
  styleUrl: './template.css',
})
export class Template implements OnInit  , AfterViewInit{
@Input() data : TempData ={qrData : "DM2-TRN-WSB-00091"};
@Input() printMode : number = 1 ;
firstId = '';
secondId = '';
thirdId = '';
qrLogoPath:string = environment.logoUrl;
qrMessageAr:string = environment.qrMessageAr;
qrMessageEn:string = environment.qrMessageEn;

constructor(private el: ElementRef){}
 

ngOnInit(){
  this.firstId = this.newuuid();
  this.secondId = this.newuuid();
  this.thirdId = this.newuuid();
}
 ngAfterViewInit(): void {
  const svgEl = this.wordToSVGElement(this.data.qrData, this.printMode == 1?20:25, "black" , "100%");
  const svgE2 = this.wordToSVGElement(environment.qrMessageEn, this.printMode == 1?18 : 21, this.printMode == 1 ?"red" : "black" ,"100%");
  const svgE3 = this.wordToSVGElement(environment.qrMessageAr, this.printMode == 1?18 : 21, this.printMode == 1 ?"red" : "black" ,"100%");
  document.getElementById(this.firstId)!.appendChild(svgEl);
  document.getElementById(this.secondId)!.appendChild(svgE2);
  document.getElementById(this.thirdId)!.appendChild(svgE3);
  }
newuuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
wordToSVGElement(
  word: string,
  fontSize: number,
  color: string  ,
  width:string ,
): SVGSVGElement {
  
 // const width = word.length * fontSize * 0.6;
  const height = fontSize * 1.4;
  const parser = new DOMParser();
  const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <text x="50%" text-anchor="middle" y="${fontSize}" font-size="${fontSize}" font-weight="bold" fill="${color}">
            ${word}
          </text>
        </svg>`;

  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  return svgDoc.documentElement as unknown  as SVGSVGElement;
}
}
