import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Form: FormGroup;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, public router: Router, private fb: FormBuilder) {
    this.Form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  username: string;
  password: string;
  body = {};
  status;

  ngOnInit() {
  }


  login(): void {
    console.log(this.Form.value);
    var form = this.Form.value;
    // console.log("user & pass", username1, password1);
    this.body["username"] = form.username;
    this.body["password"] = form.password;
    var message = "Successful login";
    var message1 = "Wrong credetials";
    console.log(this.body)
    this.body = { username: form.username, password: form.password };
    console.log(typeof (this.body));
    this.http.post("http://localhost:2000/authenticate", this.body, { responseType: 'text' }
      // {"username":this.username,"password":this.password}
    ).subscribe((res) => {
      console.log(res);
      this.status = res;
      if (this.status == "success") {
        this.snackBar.open(message, form.username, {
          duration: 1000,
        });
        this.router.navigateByUrl('/userlist');
      } else {
        this.snackBar.open(message1, form.username, {
          duration: 1000,
        });
        this.router.navigateByUrl('/login');
      }

    })
    console.log(this.username, this.password)
  }

}
