import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,firstValueFrom } from 'rxjs';



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
    
  ){
  }

   register(data:IRegisterData):Observable<any>{
    return this.http.post(`${this.url}/register`,data);
  }

  login(data:IUserAuthData|IEmailAuthData):Observable<any>{
    return this.http.post(`${this.url}/login`,data)
  }
  
  async checkLogin(){
 
    let response:boolean;
    let token = await JSON.parse(sessionStorage.getItem('user')!)?.token;
    
    if(!token)
      return false;
    
    
    let headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    let request = this.http.get(`${this.url}/token`,{headers:headers})
    request.subscribe({
      next:(result)=>{
        response = true;
      },
      error:(err)=>{
        //unauthorized
        response = false;
           
      }
    })
    
  
    if(await firstValueFrom(request))
      return response!;

    return false;
  
}

}
