import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowsComponent } from './tv-shows.component';
import { TvShowsService } from '../../services/tvshows.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TvShowsComponent', () => {
  let component: TvShowsComponent;
  let fixture: ComponentFixture<TvShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvShowsComponent],
      providers: [
        { provide: TvShowsService, useValue: { searchTvShows: () => of([]), getTvShowsByGenre: () => of([]) } },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
