import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { BookService } from '../services/book.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Books } from '../models/books';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bookService: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    const BookServiceSpy = jasmine.createSpyObj('BookService', [
      'SearchBooksByGenres',
      'getBookDescription',
    ]);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, BrowserModule, FormsModule, NgbModule],
      providers: [
        {
          provide: BookService,
          useValue: BookServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search books by genres', () => {
    const dummyData = {
      works: [
        { key: '1', title: 'Book 1', authors: [{ name: 'Author 1' }] },
        { key: '2', title: 'Book 2', authors: [{ name: 'Author 2' }] },
      ],
    };

    bookService.SearchBooksByGenres.and.returnValue(of(dummyData));

    component.genre = 'fiction';
    component.searchBooks();

    expect(bookService.SearchBooksByGenres).toHaveBeenCalledWith('fiction');
    expect(component.books.length).toEqual(dummyData.works.length);
    expect(component.books[0].authors).toEqual(['Author 1']);
    expect(component.books[1].authors).toEqual(['Author 2']);
  });

  it('should get book description', () => {
    const key = '1';
    const dummyData = {
      description: 'description',
      title: 'title',
      covers: [1],
      subject_places: ['places'],
    };

    bookService.getBookDescription.and.returnValue(of(dummyData));
    component.getBookDescription(key);

    expect(bookService.getBookDescription).toHaveBeenCalledWith(key);
  });

  it('should call getBookDescriptionAndToggleCollapse', () => {
    const book = {
      description: 'description',
      title: 'title',
      covers: [1],
      subject_places: ['places'],
    };

    spyOn(component, 'getBookDescriptionAndToggleCollapse');

    component.getBookDescriptionAndToggleCollapse(book);

    // Simulate click event on button
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.getBookDescriptionAndToggleCollapse).toHaveBeenCalledWith(
      book
    );
  });
});
