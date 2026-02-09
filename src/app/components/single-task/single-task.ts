import { Component,Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ITaskSingle } from '../../utils/interfaces';


@Component({
  selector: 'app-single-task',
  imports: [MatIconModule],
  templateUrl: './single-task.html',
  styleUrl: './single-task.less',
})
export class SingleTask {
  @Input() taskInfo!:ITaskSingle;

    priorityClasses:string[]=[
      'priority1',
      'priority2',
      'priority3',
      'priority4'
    ]

    tags:any = {
      0:{
        name:'study',
        color:'#C48C14'
      },
      1:{
        name:'math',
        color:'#191667'
      }
    }

  dotHandler(){
    this.taskInfo.isCompleted = !this.taskInfo.isCompleted
  }
}
