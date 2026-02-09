import { Component,afterNextRender } from '@angular/core';
import { Auth as AuthService } from '../../services/auth/auth';
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { PLATFORM_ID } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


//Components
import { WidgetDefault } from '../../components/widget-default/widget-default';
import { DashNavbar } from '../../components/dash-navbar/dash-navbar';
import { Sidenav } from '../../components/sidenav/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Calendar } from '../../components/calendar/calendar';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule,WidgetDefault,MatSidenavModule,DashNavbar,Sidenav,MatMenuModule,MatButtonModule,Calendar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less',
  
})

export class Dashboard{

  AuthService = inject(AuthService)
  platformId = inject(PLATFORM_ID)


  public leftArrow:boolean = false;
  public rightArrow:boolean= true;
  public isSidenavOpen:boolean = false;

  constructor(
    private router:Router
  ){
    afterNextRender(async()=>{
      
      if(!await this.AuthService.checkLogin()){
        this.router.navigateByUrl('/auth');
      }
    })
  }

  setIsSidenavOpen(event:boolean){
    this.isSidenavOpen = event
  }

  rightScroll(){
    let width = document.querySelector('.page')?.clientWidth;
    let container:HTMLElement = document.querySelector('.flex')!;

    container?.animate([
      {marginLeft:0},
      {marginLeft:-width!+'px'}
    ],
    {
        duration:200,
        fill:"forwards",
        easing:"ease-in"
    })

    this.rightArrow = false;
    this.leftArrow = true;

    
    

    
  }

  leftScroll(){
    this.leftArrow = false;
    this.rightArrow = true;   

    let width = document.querySelector('.page')?.clientWidth;
    let container:HTMLElement = document.querySelector('.flex')!;

    container?.animate([
      {marginLeft:-width!+'px'},
      {marginLeft:0}
    ],
    {
        duration:200,
        fill:"forwards",
        easing:"ease-in"
      })

     
  }

  
  
}
