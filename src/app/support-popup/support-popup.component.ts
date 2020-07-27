import { Component, Inject } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { trigger, style, animate, transition, AnimationEvent } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  templateUrl: './support-popup.component.html',
  styleUrls: ['./support-popup.component.css']
})
export class SupportPopupComponent {

  private confirmState = 'cancel';

  constructor(public dialogRef: MatDialogRef<SupportPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // SET DEFAULT VALUES
    dialogRef.disableClose = true; // do not close by clicking off by default
    if (!this.data.title) { this.data.title = 'Contact Us'; }
  }

  /**
   * Cancel/close the dialog
   */
  onNoClick(): void {
    this.dialogRef.close(this.onCancel());
  }

  onCancel(): any {
    this.confirmState = 'cancel';
    return {state: this.confirmState};
  }

  onConfirm(): any {
    this.confirmState = 'login';
    return {state: this.confirmState};
  }

}
