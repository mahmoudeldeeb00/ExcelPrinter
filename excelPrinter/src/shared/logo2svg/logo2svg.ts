import { Component } from '@angular/core';
import { environment } from '../../environments/environment.model';

@Component({
  selector: 'app-logo2svg',
  imports: [],
  templateUrl: './logo2svg.html',
  styleUrl: './logo2svg.css',
})
export class Logo2svg {
   marginleft:string = environment.blackWhitelogomarginleft;
  marginbottom:string = environment.blackWhitelogomarginbottom;
  width:number = environment.blackWhitelogoWidth;
  height:number = environment.blackWhitelogoHeight;
}
