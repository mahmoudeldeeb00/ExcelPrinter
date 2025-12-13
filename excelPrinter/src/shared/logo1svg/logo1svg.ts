import { Component } from '@angular/core';
import { environment } from '../../environments/environment.model';

@Component({
  selector: 'app-logo1svg',
  imports: [],
  templateUrl: './logo1svg.html',
  styleUrl: './logo1svg.css',
})
export class Logo1svg {
  marginleft:string = environment.colorlogomarginleft;
  marginbottom:string = environment.colorlogomarginbottom;
  width:number = environment.colorlogoWidth;
  height:number = environment.colorlogoHeight;
}
