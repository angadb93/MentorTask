import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  rGroup: FormGroup;
  status;
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

  constructor(public snackBar: MatSnackBar,private http: HttpClient,public router: Router, private fb: FormBuilder) {
    this.rGroup = fb.group({
      EnterName: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      //email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email : ['',[Validators.required, Validators.email]],
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
    var message = "Registration Successful";
    console.dir(this.rGroup.value);
    var gform = this.rGroup.value
    this.http.post(this.apiUrl + '/userdata/', gform ).subscribe(
      (data) => {
        console.log("abc:", data);
       // this.status = data;
        //console.dir("status",this.status)
        this.router.navigateByUrl('login');
        if(data['status']=="success")
        {
          this.snackBar.open(message, gform.username, {
            duration: 1000,
          });
        }
      })
  }
  updateCheck(hobby: string, isChecked: boolean) {
    const HobbyArray = <FormArray>this.rGroup.controls.hobbies;
    if (isChecked) {
      HobbyArray.push(new FormControl(hobby));
    } else {
      let index = HobbyArray.controls.findIndex(x => x.value == hobby)
      HobbyArray.removeAt(index);
    }
  }

}
