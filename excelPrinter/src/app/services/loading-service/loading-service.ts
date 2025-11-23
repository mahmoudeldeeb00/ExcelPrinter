import {Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Loader1 } from '../../../shared/loader1/loader1';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
   _dialog :any;
constructor(private dialog:MatDialog){

}

showLoader(){
 this._dialog =  this.dialog.open( Loader1 , {
  width:'70%',
   disableClose: true, // يمنع المستخدم من إغلاق الـ dialog
    panelClass: 'custom-loader-dialog', // اختياري لتنسيق أكبر
    backdropClass: 'custom-backdrop' // اختياري لتعتيم الخلفية
  })
}
hideloader(){
  this._dialog.close()
}
}
