import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth as AuthService } from '../../services/auth/auth';
import { afterNextRender } from '@angular/core';

@Component({
  selector: 'app-header-navbar',
  imports: [RouterLink],
  templateUrl: './header-navbar.html',
  styleUrl: './header-navbar.less'
})
export class HeaderNavbar{
  AuthService = inject(AuthService)

  public isLogged!:boolean;

  constructor(){
    afterNextRender(async ()=>{
      if(await this.AuthService.checkLogin()){
        this.isLogged = true;
      }
      else{
        this.isLogged = false;
      }
    })
  }

}
