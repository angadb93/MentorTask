import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  eGroup: FormGroup;

  ngOnInit() {
  }
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.eGroup = fb.group({
      EnterName: [data.EnterName, Validators.required],
      UserName: [data.UserName, Validators.required],
      //email : [data.email,Validators.required,Validators.email],
      email: [data.email, Validators.compose([Validators.required, Validators.minLength(5)])],
      gender: [data.gender, Validators.required],
      contact: [data.contact, Validators.required],
      // checker:['',Validators.required],
      city: [data.city, Validators.required],
      animalControl: [data.animalControl, Validators.required],
      hobbies: this.fb.array([])
    })


  }

  onNoClick(): void {
    console.log("formvalue:", this.eGroup.value);

    this.dialogRef.close(this.eGroup.value);

  }
  close(){
    this.dialogRef.close(this.eGroup.value);
  }

}
