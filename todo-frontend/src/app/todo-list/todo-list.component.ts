import { Component } from '@angular/core';
import {TodosService} from "../services/todos.service";
import {NgForOf} from "@angular/common";
import {Todo} from "../data/todo";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos : Todo[] = [];

  constructor(todosService: TodosService) {
    todosService.todos.subscribe(value => this.todos = value);
    todosService.fetchTodos();
  }
}
