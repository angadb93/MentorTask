import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }
  apiUrl = "http://localhost:2000";
  updateData(d, _id) {
    // console.log(data.hostname,post.loopback,id);
    return this.http.put(this.apiUrl + '/updateData/' + d, _id);
  }

  search(pageIndex, pageSize, filterValue){
    // if(filterValue==null)
    // {
    //   let data='null';
    //   return this.http.get(this.apiUrl + '/' + pageIndex +'/' + pageSize + '/' + data);
    // }
    // else
    // {
      return this.http.get(this.apiUrl + '/' + pageIndex +'/' + pageSize + '/' + filterValue);  
  }
}

