import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieComponent } from './movie.component';
import { MoviesService } from 'src/app/services/movies.service';
import { StorageService } from 'src/app/services/storage.service';
import { of } from 'rxjs';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  // Mock services
  const moviesServiceMock = {
    getMovie: () => of({}),
    getMovieVideos: () => of([]),
    getMovieImages: () => of({}),
    getMovieCredits: () => of({ cast: [] }),
    getMovieSimilar: () => of([])
  };

  const storageServiceMock = {
    isItemInList: () => false,
    addItem: () => { },
    removeItem: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MovieComponent, // Import standalone component
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceMock },
        { provide: StorageService, useValue: storageServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
