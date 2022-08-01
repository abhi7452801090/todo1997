import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { ITask } from '../model/task';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  completed: ITask [] = [];
  constructor(private fb : FormBuilder, public dialog: MatDialog) { }

  openDialog(){
    this.dialog.open(SigninComponent);

  }
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required],
      itemm : ['', Validators.required]
     
    })
  }
addTask(){
  this.tasks.push({
    description:this.todoForm.value.item,
    completed:false
  })
  this.tasks.push({
    description:this.todoForm.value.itemm,
    completed:false
  })
}

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
}
}
