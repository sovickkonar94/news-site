import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getProjectName(){
  	return 'Mean Stack Project'
  }

  getTopNews():Observable<any>{
  		return this.http.get<any>('http://localhost:5000/api/top');
  }

  getNewsSearch(search):Observable<any>{
  	return this.http.post<any>('http://localhost:5000/api/search',search);
  }
}
