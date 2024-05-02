import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  genre: string = '';
  books: any[] = [];
  book: any;
  constructor(private bookService: BookService) {}

  searchBooks(): void {
    this.bookService.SearchBooksByGenres(this.genre).subscribe((data) => {
      this.books = data.works.map((work: any) => {
        const authors = work.authors.map((author: any) => author.name);
        return { ...work, authors, kei: work.key, isCollapsed: false };
      });
      this.genre = '';
    });
  }

  getBookDescription(key: string): void {
    this.bookService.getBookDescription(key).subscribe((data) => {
      this.book = this.books.find((book) => book.kei === key);
      if (this.book) {
        this.book.description = data.description;
      }
    });
  }

  toggleCollapse(book: any): void {
    book.isCollapsed = !book.isCollapsed;
  }

  getBookDescriptionAndToggleCollapse(book: any): void {
    this.getBookDescription(book.kei);
    this.toggleCollapse(book);
  }

  onInputChange(event: any): void {
    this.genre = event.target.value.replace(/\s/g, '');
  }
}
