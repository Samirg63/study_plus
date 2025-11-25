import { Component,Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatIconModule],
  templateUrl: './card.html',
  styleUrl: './card.less',
  
})
export class Card {
  @Input() color!:string;
  @Input() title!:string;
  @Input() description!:string;
  @Input() icon!:string

}
