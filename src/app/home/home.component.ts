import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import {DataService} from '../data.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator} from '@angular/material';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(){
  }
}
