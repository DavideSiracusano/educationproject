import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpTest = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTest.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search books by genres', () => {
    const genre = 'fiction';
    const dummyData = {
      works: [
        { key: '1', title: 'Book 1', authors: [{ name: 'Author 1' }] },
        { key: '2', title: 'Book 2', authors: [{ name: 'Author 2' }] },
      ],
    };
    service.SearchBooksByGenres(genre).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpTest.expectOne(
      `https://openlibrary.org/subjects/${genre}.json`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should get book description', () => {
    const key = '/works/OL123456W';
    const dummyData = {
      description: 'description',
      title: 'title',
      covers: [1],
      subject_places: ['place'],
    };
    service.getBookDescription(key).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpTest.expectOne(`https://openlibrary.org${key}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
