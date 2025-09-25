import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Todo} from "../data/todo";

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private _apiUrl: string = 'http://localhost:5168/todos';

  todos = new BehaviorSubject<Todo[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  fetchTodos() {
    return this.httpClient.get<Todo[]>(this._apiUrl).subscribe(
      value => this.todos.next(value),
    );
  }

  createTodo(title : string) {
    const request = this.httpClient.post<Todo>(this._apiUrl, {
      title : title
    });

    request.subscribe((value) => this.todos.next([...this.todos.value, value]));
    return request;
  }

  removeTodo(id: string) {
    const request = this.httpClient.delete(`${this._apiUrl}/${id}`);
    request.subscribe(() => this.fetchTodos());
    return request;
  }
}
