import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';  // using for toast message
@Injectable()
export class ToastService {

  constructor(public snackBar: MatSnackBar) { }
  // material snackbar toast message
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    
  }

}
