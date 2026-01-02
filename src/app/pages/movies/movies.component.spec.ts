import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: MoviesService, useValue: {
            searchMovies: () => of([]),
            getMoviesByGenre: () => of([]),
            getMoviesGenres: () => of([]),
            searchMoviesAdvanced: () => of([])
          }
        },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call advanced search when filters are present', () => {
    const service = TestBed.inject(MoviesService);
    spyOn(service, 'searchMoviesAdvanced').and.callThrough();

    const state = {
      page: 1,
      selectedGenres: [28],
      watchProviders: [8],
      startDate: '',
      endDate: '',
      sort: 'popularity.desc',
      search: '',
      category: 'popular'
    };

    component.onFilterChange(state);

    expect(service.searchMoviesAdvanced).toHaveBeenCalledWith(1, {
      genres: [28],
      watchProviders: [8],
      startDate: '',
      endDate: '',
      sort: 'popularity.desc'
    });
  });

  it('should call regular search when no complex filters', () => {
    const service = TestBed.inject(MoviesService);
    spyOn(service, 'searchMovies').and.callThrough();

    const state = {
      page: 1,
      category: 'popular',
      sort: 'popularity.desc',
      search: '',
      selectedGenres: [],
      startDate: '',
      endDate: ''
    };

    component.onFilterChange(state);

    expect(service.searchMovies).toHaveBeenCalledWith(1, undefined, 'popular');
  });
});
