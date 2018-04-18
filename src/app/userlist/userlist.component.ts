import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/merge';
import { debounceTime, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import { DataService } from '../data.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OpendialogComponent } from '../opendialog/opendialog.component';
import { EditComponent } from '../edit/edit.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
// import {Sort} from '@angular/material';
import { Subscription } from 'rxjs/Rx';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  displayedColumns = ['EnterName', 'UserName', 'email', 'gender', 'contact', 'city', 'animalControl', 'action'];
  dataSource: any = new MatTableDataSource<any>();
  result = '';
  dataObject: any[] = [];
  obj = [];
  length: Number = 0;
  // per_page:number;
  EnterName = "";
  formCtrlSub: Subscription;
  EnterNameControl = new FormControl();
  i = 1;
  flag: boolean = false;
  _id: any;
  index1: number;
  updateID;
  pageSize: number = 3;
  form;
  pageSizeOptions = [3, 5, 10, 15];
  pageIndex: number = 0;
  data1;
  sortedData;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('input') inputElRef: ElementRef;

  apiUrl = "http://localhost:2000";
  constructor(private http: HttpClient, public dialog: MatDialog, private service: DataService, fb: FormBuilder) {
    
  }

  ngAfteViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  

  ngOnInit() {
    this.sort.active = " ";
    this.sort.direction = "asc";
    //this.onSubmit(this.paginator);
    this.getData()
  }

  applyFilter(filterValue: string) {
    console.log("qqqqq", this.dataSource);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //   this.dataSource.paginator = this.paginator;
    this.dataSource.filter = filterValue;
  }

  getData(){
    this.http.get(this.apiUrl + '/getInfo/' + this.pageIndex + '/' + this.pageSize + '/' +this.sort.active + '/' +this.sort.direction).subscribe(
      data => {
        console.log("result:", data);
        console.log("index", this.pageIndex);
        //this.getPage(data);
        this.obj = data['data'] as Array<any>;
        this.paginator.pageIndex = data['pageIndex'];
        this.paginator.pageSize = data['pageSize'];
        this.data1 = this.dataSource.data;
        console.log(this.length);
        this.length = data['count'];
        // this.dataSource = new MatTableDataSource(data['data'] as Array<any>)
        this.dataSource = data['data'];
        console.log("datasource", this.dataSource);
        //console.log('data',data);
        //this.getData(data);
      });
    // this.sortedData = this.dataSource.slice();
  }

  sortData(sort){
    //console.log("angad",sort);
    console.log("angad : ",sort.active);
    console.log("angad1 :",sort.direction);
    this.sort.active =sort.active;
    this.sort.direction = sort.direction;
    if(!this.sort.active || this.sort.direction == "")
    {
      this.sort.active = " "
      this.sort.direction = "asc";
    }
    this.getData();
  }

  

  applyfilter(event) {
    console.log("In apply filter :" + event.target.value);
    var search = event.target.value;
    let search1 = 'nodata';
    if (search == '') {
      // console.log('empty',search1);
      // // search='null';
      // this.http.get(this.apiUrl + '/' + this.pageIndex + '/' + this.pageSize + '/'+ search1).subscribe(data=>{
      //   console.log("data123",data);
      //   this.dataSource=new MatTableDataSource(data as Array<any>);
      // })
      this.onSubmit(this.paginator);
    }
    else {
      this.http.get(this.apiUrl + '/' + this.pageIndex + '/' + this.pageSize + '/' + search).debounceTime(1000).subscribe(data => {
        console.log("data123", data);
        this.dataSource = new MatTableDataSource(data as Array<any>);
      })
    }
  }


  onSubmit(event: PageEvent) {
    // event.pageIndex = event.pageIndex+1;
    console.log("edata:", event);
    var pageSize: any = 3;
    console.log("aaa", event.pageIndex);
    console.log("www", event.pageSize);
    this.http.get(this.apiUrl + '/getInfo/' + this.paginator.pageIndex + '/' + event.pageSize).subscribe(
      data => {
        console.log("result:", data);
        this.paginator.pageSize = data['pageSize'];
        this.length = data['count'];
        this.dataSource = new MatTableDataSource(data['data'] as Array<any>)
        console.log("datasource", this.dataSource);
        //this.getPage(data);
        //this.getData(data);
      });
  }
  

  openDialog(data) {
    console.log("data", data)
    let dialogRef = this.dialog.open(OpendialogComponent, {
      height: '350px',
      data: { EnterName: data.EnterName, UserName: data.UserName, email: data.email, gender: data.gender, contact: data.contact, city: data.city, animalControl: data.animalControl }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      data.row = result;
    });
  }

  addDialog(addinfo: any) {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      height: '500px', width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed', result);
      //addinfo.row = result;
      this.http.post(this.apiUrl, '/saveData', result).subscribe((Response) => {
        console.log("res", Response);
        this.onSubmit(this.paginator);
      })
    })
  }

  delete(id) {
    console.log("zz:", )
    var index = this.obj.indexOf(id);
    //this.obj.splice(index,1);
    let dialogRef = this.dialog.open(DeleteComponent, {
      data:{
        userId:id
      }
    });

    // const sub = dialogRef.componentInstance.close.subscribe((res) => {
    //   // console.log("f data :",res);
    //   if (res.status == 'delete') {
    //     var updateObj = { "EnterName": EnterName.value, "UserName": UserName.value, "email": email.value, "gender": gender.value, "contact": contact.value, "city": gender.value, "animalControl": gender.animalControl };
    //     this.service.deleteData(,d._id).subscribe((res) => {
    //       console.log("delete : server result", res);
    //       if (res['status'] == 'true') {
    //         this.onSubmit(this.paginator);
    //       } 
    //     });
    //   }//if
    // });

    dialogRef.afterClosed().subscribe(result => {
      // this.http.get(this.apiUrl + '/delete/' + id._id).subscribe((Response) => {
      //   console.log(Response);
        this.onSubmit(this.paginator);
      // });
      console.log(result);
    });
    
  }

  edit(data: any) {
    console.log('edited:');
    this.index1 = this.obj.indexOf(data);
    this._id = data._id;
    let dialogRef = this.dialog.open(EditComponent, {
      data: { EnterName: data.EnterName, UserName: data.UserName, email: data.email, gender: data.gender, contact: data.contact, city: data.city, animalControl: data.animalControl }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      data.row = result;
      this.obj[this.index1] = result;
      this.service.updateData(this._id, result).subscribe((Response) => {
        console.log("res",Response);
        this.onSubmit(this.paginator);
      })
    });
  }

  update(EnterName, UserName, email, gender, contact, city, animalControl) {
    console.log(this.index1);
    console.log("updates", EnterName.value, UserName.value, email.value, gender.value, contact.value, city.value, animalControl.value, );
    var updateObj = { "EnterName": EnterName.value, "UserName": UserName.value, "email": email.value, "gender": gender.value, "contact": contact.value, "city": city.value, "animalControl": animalControl.value };
    this.service.updateData(updateObj, this._id).subscribe((Response) => {

      console.log(Response);
    });
    this.obj[this.index1] = updateObj;
    this.form.reset();
    this.flag = false;
  }
}

