import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRegisterData } from '../../utils/interfaces';
import { IUserAuthData,IEmailAuthData } from '../../utils/interfaces';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class Auth {

  private url:string = 'http://localhost:3000/auth'

  constructor(
    private http:HttpClient,
    private router:Router, 
  ){}

   register(data:IRegisterData):Observable<any>{
    return this.http.post(`${this.url}/register`,data);
  }

  login(data:IUserAuthData|IEmailAuthData):Observable<any>{
    return this.http.post(`${this.url}/login`,data)
  }
  
  checkLogin(){

    let token = JSON.parse(sessionStorage.getItem('user')!)?.token;
    
    if(!token){
      return this.router.navigateByUrl('/auth')
    }
    
    let headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get(`${this.url}/token`,{headers:headers})
    .subscribe({
      next:(result)=>{
        return true 
      },
      error:(err)=>{
        //unauthorized
        if(err.error.statusCode == 401)
          this.router.navigateByUrl('/auth');
          return false
      }
    })
    
    
  }

}
