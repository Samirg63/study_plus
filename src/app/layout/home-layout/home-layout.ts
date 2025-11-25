import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavbar } from '../../components/header-navbar/header-navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home-layout',
  imports: [RouterOutlet,HeaderNavbar,Footer],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.less'
})
export class HomeLayout {

}
