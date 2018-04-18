import { Component, OnInit, Inject, Output,  EventEmitter } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  //@Output() close: EventEmitter<any> = new EventEmitter();
  @Output() close = new EventEmitter<any>(true);
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  ngOnInit() {
    console.log(this.data);
}

  onNoClick() {
    this.dialogRef.close();
  }

  confirmDelete() {
    if(this.data) {
      console.log("ID:",this.data.userId._id);
      this.dataService.deleteData(this.data.userId._id).subscribe((res) => {
          console.log("delete : server result", res);
    });
  }
     this.dialogRef.close();
    
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // confirmDelete(): void {
  //   this.dataService.deleteIssue(this.data);
  // }

}
