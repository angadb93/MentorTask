import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Issue} from '../issue'

@Injectable()
export class DataService {

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient) { }
  apiUrl = "http://localhost:2000";
  updateData(d, _id) {
    // console.log(data.hostname,post.loopback,id);
    return this.http.put(this.apiUrl + '/updateData/' + d, _id);
  }

  deleteData(id){
    console.log(id);
    //return this.http.get(this.apiUrl+ '/deleteData/' + d, _id);
    return this.http.get(this.apiUrl + '/delete/' + id);
  } 

  search(pageIndex, pageSize, filterValue){
      return this.http.get(this.apiUrl + '/' + pageIndex +'/' + pageSize + '/' + filterValue);  
  }

  // deleteIssue (EnterName: string): void {
  //   console.log(EnterName);
  // }
}

