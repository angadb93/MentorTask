import { Component, OnInit, Inject, group } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  nGroup: FormGroup;
  FormArray
  // checked = false;

  apiUrl = "http://localhost:2000";

  hobbies = [
    { name: 'Music' },
    { name: 'Playing' },
    { name: 'Outing' },
    { name: 'Cooking' }
  ];

  animals = [
    { name: 'Dog' },
    { name: 'Cat' },
    { name: 'Cow' },
    { name: 'Fox' },
  ];

  constructor(public dialog: MatDialog, private http: HttpClient, private fb: FormBuilder, public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nGroup = fb.group({
      EnterName: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      gender: ['male', Validators.required],
      contact: ['', Validators.required],
      // checker:['',Validators.required],
      city: ['', Validators.required],
      animalControl: ['', Validators.required],
      hobbies: this.fb.array([])
    })
  }


  ngOnInit() {
  }


  save() {
    console.log(this.nGroup.value);
    this.http.post(this.apiUrl + '/saveData/', this.nGroup.value).subscribe(
      data => {
        console.log("abc:", data);
      })
    this.dialogRef.close();
  }

  updateCheck(hobby: string, isChecked: boolean) {
    const HobbyArray = <FormArray>this.nGroup.controls.hobbies;
    if (isChecked) {
      HobbyArray.push(new FormControl(hobby));
    } else {
      let index = HobbyArray.controls.findIndex(x => x.value == hobby)
      HobbyArray.removeAt(index);
    }
  }


}
