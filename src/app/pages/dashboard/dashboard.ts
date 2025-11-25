import { Component, ViewChild } from '@angular/core';
import { Auth as AuthService } from '../../services/auth/auth';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';


//Components
import { WidgetDefault } from '../../components/widget-default/widget-default';
import { DashNavbar } from '../../components/dash-navbar/dash-navbar';
import { Sidenav } from '../../components/sidenav/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule,WidgetDefault,MatSidenavModule,DashNavbar,Sidenav,MatMenuModule,MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less',
  
})

export class Dashboard implements OnInit{

  AuthService = inject(AuthService)
  platformId = inject(PLATFORM_ID)


  public leftArrow:boolean = false;
  public rightArrow:boolean= true;
  public isSidenavOpen:boolean = false;

  setIsSidenavOpen(event:boolean){
    this.isSidenavOpen = event
  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.AuthService.checkLogin()
    }
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
