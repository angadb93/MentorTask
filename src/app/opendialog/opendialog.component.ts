import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-opendialog',
  templateUrl: './opendialog.component.html',
  styleUrls: ['./opendialog.component.css']
})
export class OpendialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OpendialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
  }
  // onNoClick() {
  //   this.dialogRef.close();
  // }
}
