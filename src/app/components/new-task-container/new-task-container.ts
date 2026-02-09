import { Component, Output,EventEmitter, ViewChild, model, signal, ModelSignal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, DropdownDividerDirective, DropdownCloseDirective } from '@coreui/angular';
import {MatCardModule} from '@angular/material/card';

import { ITaskSingle } from '../../utils/interfaces';

@Component({
  selector: 'app-new-task-container',
  imports: [
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    DropdownComponent,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    MatDatepickerModule,
    MatCardModule,
    DropdownCloseDirective
],
  templateUrl: './new-task-container.html',
  styleUrl: './new-task-container.less',
})
  export class NewTaskContainer{
    @Output() closeContainer = new EventEmitter<void>();
    @ViewChild('picker') datePicker!: MatDatepicker<Date>;

    selected = model<Date | null>(null);

    data:ITaskSingle = {
      title: '',
      description: '',
      date:'',
      isCompleted:false,
      linkedTo:false,
      priority:4,
      repeat:false,
      tags:[]
    }
    

    closeContainerHandler(){
      this.closeContainer.emit()
    }

    createTask(){
      this.closeContainer.emit();
    }

    setPriority(level:number){
      this.data.priority = level;
    }

    resetDatepicker(){
      this.selected.set(null)
    }
}
