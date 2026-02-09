import { Component,ElementRef,OnInit,OnDestroy, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule } from '@angular/material/icon';
import {MatProgressSpinner, MatSpinner} from '@angular/material/progress-spinner'

import {CookieService} from 'ngx-cookie-service'


import { ReactiveFormsModule, FormGroup,FormBuilder } from '@angular/forms';

//Services
import {Auth as AuthService} from '../../services/auth/auth';

//Interfaces
import { IEmailAuthData, IRegisterData, IUserAuthData } from '../../utils/interfaces';


type IError = {
  message:string
} | false;

interface ISigninErrors{
  username:IError,
  password:IError,
  confirmPassword:IError,
  terms:IError,
  email:IError,
}

interface ILoginErrors{
  login:IError,
  password:IError
}



@Component({
  selector: 'app-auth',
  imports: [NgClass,ReactiveFormsModule, RouterLink, MatIconModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule,MatProgressSpinner],
  providers:[
    {provide:MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue:{appearance:'outline'}}
  ],
  templateUrl: './auth.html',
  styleUrls: ['./auth.less','./overrides.scss'],
})


export class Auth implements OnInit,OnDestroy{

  public authMethod!:string | null;
  public showPassword:boolean = false
  public showPasswordHints:boolean = false;
  public passwordRequirements = {
    hasLength:false,
    hasCapital:false,
    hasNumber:false,
    hasSymbol:false
  }
  public loading:boolean = false;
  
  private paramSubscription!:Subscription
  private AuthService = inject(AuthService)
  public signinData!:FormGroup;
  public loginData! :FormGroup;

  

  SigninErrors:ISigninErrors = {
    username:false,
    password:false,
    email:false,
    confirmPassword:false,
    terms:false
  }

  LoginErrors:ILoginErrors = {
    login:false,
    password:false
  }

  



  constructor(
    private route:ActivatedRoute,
    private elementRef:ElementRef,
    private formBuild:FormBuilder,
    private CookieService:CookieService,
    private router:Router
  ){}

  ngOnInit():void{


    this.paramSubscription = this.route.params.subscribe(param=>{

      this.authMethod = param['method'];
    })

    this.signinData = this.formBuild.group({
      username:[null],
      email:[null],
      password:[null],
      confirmPassword:[null],
      terms:[false],
    })

    this.loginData = this.formBuild.group({
      login:[null],
      password:[null],
      rememberMe:[null],
    })

   //Change the default background color
  this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right top,#442464 50%, #141414 50%)'
  }

  ngOnDestroy(): void {
      if(this.paramSubscription){
        this.paramSubscription.unsubscribe();
      }

    //Change the default background color
    this.elementRef.nativeElement.ownerDocument.body.style.background = '#f0f0f0'
  }

  async SubmitHandler(method:'signin' | 'login'){
    if(method === 'signin'){
      //Detect issues in the data coming from the form
      await new Promise((resolve)=>{
        let error:IError = false;

        Object.keys(this.signinData.value).map((key:string)=>{
            error = false;

          if(!this.signinData.value[key]){
            // A required data hadn't been passed;
            error = {
              
              message:`*${key} is required!`
            }
            if(key == 'confirmPassword'){
              error.message = "*Password doesn't match!"
            }
      
          }else if(key === 'email' && !this.validateEmail(this.signinData.value[key])){
            error = {
              
              message:`*Set a valid E-mail`
            }  
          }

          this.SigninErrors[key as keyof ISigninErrors] = error
          if(error){
            this.signinData.get(key as keyof ISigninErrors)?.setErrors({'invalid':true});
          }
          
        })
        
        if(error){
          throw "the form was not filled out correctly"     
        }

        //Test with the two password match
        if(this.signinData.value.password !== this.signinData.value.confirmPassword){
          this.SigninErrors.confirmPassword = {message:"*password doesn't match!"}
          this.signinData.get('confirmPassword')?.setErrors({'invalid':true})
          throw "the form was not filled out correctly"
        }

        if(!this.validatePassword()){
          this.SigninErrors.password = {message:"don't have all the requirements"}
          this.signinData.get('password')?.setErrors({'invalid':true})
          throw "the form was not filled out correctly"
        }

        resolve(this.signinData.value)
      })
      .then(()=>{
        this.registerUser({
          username:this.signinData.value.username,
          email:this.signinData.value.email,
          password:this.signinData.value.password
        })
      })
      .catch((e)=>{
        console.log(e)
      })

    }else{

      var loginMethod: 'email' | 'username' = 'username';

      await new Promise((resolve)=>{

        let error:IError = false;

        Object.keys(this.loginData.value).map((key:string)=>{
            error = false;
          if(!this.loginData.value[key] && key !== 'rememberMe'){
            if(key == 'password'){
              error = {            
                message:`*You need to put a ${key}`
              }
            }else{
              error = {            
                message:`*You need to put a login method`
              }
            }
          }

          this.LoginErrors[key as keyof ILoginErrors] = error
          if(error){
            this.loginData.get(key as keyof ILoginErrors)?.setErrors({'invalid':true});
          }
          
        })

      if(error){
        throw error   
      }

      //Check what is the login method
        if(Boolean(this.validateEmail(this.loginData.value.login))){
          loginMethod = 'email';
        }

        let loginData = {
          login:this.loginData.value.login,
          password:this.loginData.value.password,
          remember:this.loginData.value.rememberMe,
          method:loginMethod
        }
        resolve(loginData)
      })
      .then((data:any)=>{
        let info:any = {password:data.password}      
        if(data.method == 'email'){
          info.email = data.login;
        }else{
          info.username = data.login;
        }
      
        this.loginUser(info,data.remember)
      })
      .catch((e)=>{
        console.log(e)
      })



    }
    
  }

  validateEmail(email:string):boolean{
    let valide = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    
    return Boolean(valide);
  }

  validatePassword(): boolean {
    let password:string | null = this.signinData.value.password;
    if(!password)
      return false;
    


    let success:boolean = true;
    let checkCapital = /[A-Z]/.exec(password)
    let checkNumber = /[0-9]/.exec(password)
    let checkSymbol = /[\W]/.exec(password)
  
    
  //Must contain more then 5 chracter
    if(password.length <= 5){
      success = false
      this.passwordRequirements.hasLength = false
    }else{
      success = true
      this.passwordRequirements.hasLength = true
    }

  //Must contain a capital letter
  if (Boolean(checkCapital)){
    success = true
      this.passwordRequirements.hasCapital = true
  } else {
    success = false
      this.passwordRequirements.hasCapital = false
  }

  //Must contain a number
  if (Boolean(checkNumber)){
    success = true
      this.passwordRequirements.hasNumber = true
  } else {
    success = false
      this.passwordRequirements.hasNumber = false
  }

  //Must contain a symbol
  if (Boolean(checkSymbol)){
    success = true
      this.passwordRequirements.hasSymbol = true
  } else {
    success = false
      this.passwordRequirements.hasSymbol = false
  }




    return success;
  }

  resetValidator(){
    
    this.signinData.setErrors(null)
    this.SigninErrors = {
    username:false,
    password:false,
    email:false,
    confirmPassword:false,
    terms:false
    }

    this.loginData.setErrors(null) 
    this.LoginErrors = {
      login:false,
      password:false
    }
  }

  handleShowPassword(){
    this.showPassword = !(this.showPassword)
  }

  registerUser(data:IRegisterData){
      this.loading = true
    this.AuthService.register(data)
    .subscribe({next:(result)=>{   
        this.CookieService.set('user',JSON.stringify(result.body),1)
        this.loading = false;
        this.router.navigateByUrl('/dashboard');
 
    },error:(err:any)=>{
  
      this.loading = false;
      this.signinData.get(err.error.where as keyof ISigninErrors)?.setErrors({'invalid':true});
      this.SigninErrors[err.error.where as keyof ISigninErrors] = {message:'*'+err.error.message}
      //lidar com error e exibilos no front
    }})

  }

  loginUser(data:IUserAuthData|IEmailAuthData,remember:boolean){
    this.loading = true    
    this.AuthService.login(data)
    .subscribe({next:(result)=>{
      

      if(remember){
        this.CookieService.set('user',JSON.stringify(result.body),7)
        sessionStorage.setItem('user',JSON.stringify(result.body))
      }else{
        this.CookieService.set('user',JSON.stringify(result.body),1)
        sessionStorage.setItem('user',JSON.stringify(result.body))
      }
      this.loading = false;
      this.router.navigateByUrl('/dashboard');
      
    },error:(err:any)=>{
      this.loading = false;
      this.loginData.get(err.error.where as keyof ILoginErrors)?.setErrors({'invalid':true});
      this.LoginErrors[err.error.where as keyof ILoginErrors] = {message:'*'+err.error.message}
    }})
  }

}
