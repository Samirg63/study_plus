import { Component, ViewChild } from '@angular/core';
import { TaskContainer } from '../task-container/task-container';
import { MatInputModule } from '@angular/material/input';
import {MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { OnInit } from '@angular/core';

import { fullMonthNames } from '../../utils/convertDates';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  imports: [TaskContainer,MatDatepickerModule,MatFormFieldModule,MatInputModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.less','./overrides.scss'],
})
export class Calendar implements OnInit{
  @ViewChild('picker') datePicker!: MatDatepicker<Date>;

  public datesArr:number[] = [];
  private perPage:number = 5;
  private aDayValue:number = 24*60*60*1000;
  private page:number = 0;
  private DateNow = Date.now();

  public actMonth!:string;
  public actYear!:number;

  triggerCloseContainers: Subject<void> = new Subject<void>();

  ngOnInit(){
    this.getToday();
  }

  openDatePicker(){
    if(this.datePicker){
      this.datePicker.open()
    }
  }

  getToday(){
    let tempDatesArr:number[] = [];
    this.actYear = new Date(this.DateNow+ (this.page * this.aDayValue * this.perPage)).getFullYear()
    this.actMonth = fullMonthNames[new Date(this.DateNow+ (this.page * this.aDayValue * this.perPage)).getMonth()]
    

    for(let i = 0; i< this.perPage; i++){

      //Today date + Pagination + nextDay
      tempDatesArr.push(this.DateNow + (this.page * this.aDayValue * this.perPage) +  (this.aDayValue * i))
    }

    this.datesArr = tempDatesArr
  }

  nextPage(){
    this.page +=1;
    this.getToday();
    
  }

  previousPage(){
    this.page -=1;
    this.getToday();
    
  }

  reset(){
    this.page = 0;
    this.DateNow = Date.now();
    this.getToday();
  }

  datePickerHandler(event:MatDatepickerInputEvent<Date>){
    this.DateNow = Date.parse(String(event.value))
    this.getToday()
  }

  closeAllNewTaskContainersHandler(){
    this.triggerCloseContainers.next();
  }
}
