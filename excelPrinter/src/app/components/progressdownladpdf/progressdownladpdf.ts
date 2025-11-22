import { NgForOf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-progressdownladpdf',
  imports: [NgForOf],
  templateUrl: './progressdownladpdf.html',
  styleUrl: './progressdownladpdf.css',
})
export class Progressdownladpdf {
constructor( public dialogRef: MatDialogRef<Progressdownladpdf>,
    @Inject(MAT_DIALOG_DATA) public data:  any){
  
}

 getPercentage(value: number, total: number): string {
  if (total === 0) return '0.00%';
  const percentage = (value / total) * 100;
  return percentage.toFixed(2) + '%';
}

 closeDialog() { this.dialogRef.close();

  } 
}
