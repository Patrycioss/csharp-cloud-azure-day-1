import { Component } from '@angular/core';
import {TodosService} from "../services/todos.service";
import {NgForOf} from "@angular/common";
import {Todo} from "../data/todo";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos : Todo[] = [];
  addTodoForm: FormGroup;

  constructor(
    private _todosService: TodosService,
    formBuilder: FormBuilder,
  ) {
    this.addTodoForm  = formBuilder.group({
      title: ['', Validators.required],
    });

    _todosService.todos.subscribe(value => this.todos = value);
    _todosService.fetchTodos();
  }

  submitTodo() {
    this._todosService.createTodo(this.addTodoForm.value.title);
  }

  removeTodo(id: string) {
    this._todosService.removeTodo(id);
  }
}
