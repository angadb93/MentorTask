import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  cGroup: FormGroup;
  status;

  apiUrl = "http://localhost:2000";

  constructor(public router: Router, public snackBar: MatSnackBar, private fb: FormBuilder, private http: HttpClient) { 
    this.cGroup = fb.group({
      name: ['', Validators.required],
      //email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email : ['',[Validators.required, Validators.email]],
      textarea: ['',Validators.required]
    })
  }

  ngOnInit() {
  }

  Submit(){
    var message = "Successfully Submitted ";
    console.log("submit",this.cGroup.value);
    var cform = this.cGroup.value;
    this.http.post(this.apiUrl + '/contactData/',cform).subscribe((data)=>{
      console.log("cdata",data);
      if(data['status']=="success")
      {
        this.snackBar.open(message, cform.name, {
          duration: 1500,
        });
      }
    })
  }
}
