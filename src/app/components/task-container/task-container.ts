import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { fullWeekDay, fullMonthNames } from '../../utils/convertDates';
import { Observable, Subject, Subscription } from 'rxjs';

//components
import { NewTaskContainer } from '../new-task-container/new-task-container';
import { SingleTask } from '../single-task/single-task';

//interfaces
import { ITaskSingle } from '../../utils/interfaces';

@Component({
  selector: 'app-task-container',
  imports: [NewTaskContainer,SingleTask],
  templateUrl: './task-container.html',
  styleUrl: './task-container.less',
})
export class TaskContainer implements OnInit{
  @Output() closeAllNewTaks = new EventEmitter<void>();
  @Input() events!: Observable<void>;
  today = input<number>()
    
  

    

  public day!:string;
  public month!:string;
  public weekDay!:string;
  public isCreatingTask:boolean = false;

  private aDayValue = 24*60*60*1000;
  private eventsSubscription!: Subscription;

  closeNewTaskContainer: Subject<void> = new Subject<void>()

/*Temp*/
 
 task:ITaskSingle = {
  title:'Titulo',
  description:"Descrição do bagulho",
  date:'18/12/2025',
  priority:4,
  isCompleted:false,
  repeat:true,
  tags:[0,1],
  linkedTo:false
 }

 

 
  ngOnInit(){
    this.eventsSubscription = this.events.subscribe(()=>{this.isCreatingTask = false;})

    if(this.today()){
      let date = new Date(this.today()!)
      this.day = date.getDate().toString()
      this.month = fullMonthNames[date.getMonth()]

      //Show 'Today' on task component
      if(new Date(this.today()!).toLocaleDateString() === new Date().toLocaleDateString()){
        this.weekDay = 'Hoje';
      }else if(new Date(this.today()!).toLocaleDateString() === new Date(Date.now() + this.aDayValue).toLocaleDateString()){
        //Show 'Tomorrow' on task component
        this.weekDay = 'Amanhã';
      }else{
        //Show a default full week day name
        this.weekDay = fullWeekDay[date.getDay()]
      }
      
      
    }
  }

  handleNewTaskContainer(){
    if(!this.isCreatingTask){
      //Close all the opened create new task Containers
      this.closeAllNewTaks.emit();
    }


    this.isCreatingTask = !this.isCreatingTask;
  }

  emitCloseNewTaskContainer(){
    this.closeNewTaskContainer.next();
  }
}
