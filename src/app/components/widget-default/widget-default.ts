
import { Component, input} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';




@Component({
  selector: 'app-widget-default',
  imports: [MatMenuModule],
  templateUrl: './widget-default.html',
  styleUrl: './widget-default.less'
})



export class WidgetDefault {
  public container!:HTMLElement;
  public themeColor:any = {
    default:'rgba(68, 36, 100,.3)',
    hover:'rgba(68, 36, 100,.5)'
  }

  

  hoverHandler(event:MouseEvent){
    let container = event.target! as HTMLElement
    container.style.backgroundColor = this.themeColor.hover
  }
  
  unHoverHandler(event:MouseEvent){
    let container = event.target! as HTMLElement
    container.style.backgroundColor = this.themeColor.default
  }

}
