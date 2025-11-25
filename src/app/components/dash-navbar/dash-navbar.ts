import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { output } from '@angular/core';




@Component({
  selector: 'app-dash-navbar',
  imports: [MatIcon],
  templateUrl: './dash-navbar.html',
  styleUrl: './dash-navbar.less'
})
export class DashNavbar {
  isSidenavOpen = output<boolean>();
  sidenavStatus = input<boolean>(false);

  


  sidenavHandler(){
    this.isSidenavOpen.emit(!this.sidenavStatus())
  
  }
  
  

}
