import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less',
  providers:[CookieService]
})


export class App {
  protected readonly title = signal('study_plus');

  constructor(CookieService:CookieService){
    if(CookieService.check('user')){
      sessionStorage.setItem('user',CookieService.get('user'))
    }
  }
}
