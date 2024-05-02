import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../models/books';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  SearchBooksByGenres(genre: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/subjects/${genre}.json`;
    return this.http.get(apiUrl);
  }

  getBookDescription(key: string): Observable<Books> {
    const apiUrl = `${this.baseUrl}${key}.json`;
    return this.http.get<Books>(apiUrl);
  }
}
