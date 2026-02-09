import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { RouterLink } from '@angular/router';



interface ICardInfo {
  color:string,
  title:string,
  description:string,
  icon:string
}

@Component({
  selector: 'app-home',
  imports: [Card,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.less'
})

export class Home {

  cardsInfo:ICardInfo[]=[
    {
      color:'yellow',
      title:'titulo 1',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim necessitatibus illum porro',
      icon:'edit_document'
    },
    {
      color:'purple',
      title:'titulo 2',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim necessitatibus illum porro',
      icon:'edit_document'
    },
    {
      color:'red',
      title:'titulo 3',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim necessitatibus illum porro',
      icon:'edit_document'
    },
    {
      color:'blue',
      title:'titulo 4',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim necessitatibus illum porro',
      icon:'edit_document'
    },
    {
      color:'grey',
      title:'titulo 5',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim necessitatibus illum porro',
      icon:'edit_document'
    }
  ]

}
