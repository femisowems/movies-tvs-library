import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowsComponent } from './tv-shows.component';
import { TvShowsService } from '../../services/tvshows.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TvShowsComponent', () => {
  let component: TvShowsComponent;
  let fixture: ComponentFixture<TvShowsComponent>;
  let tvShowsServiceMock: any;

  beforeEach(async () => {
    tvShowsServiceMock = {
      searchTvShows: jasmine.createSpy('searchTvShows').and.returnValue(of([])),
      getTvShowsByGenre: jasmine.createSpy('getTvShowsByGenre').and.returnValue(of([])),
      getTvShowsGenres: jasmine.createSpy('getTvShowsGenres').and.returnValue(of([])),
      searchTvShowsAdvanced: jasmine.createSpy('searchTvShowsAdvanced').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [
        TvShowsComponent,
        RouterTestingModule,
        FormsModule,
        AccordionModule,
        CalendarModule,
        CheckboxModule,
        DropdownModule,
        RadioButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: TvShowsService, useValue: tvShowsServiceMock },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should call advanced search when filters are present in onFilterChange', () => {
    const filterState = {
      page: 1,
      selectedGenres: [123],
      startDate: '2023-01-01',
      endDate: '2023-12-31'
    };
    component.onFilterChange(filterState);
    expect(tvShowsServiceMock.searchTvShowsAdvanced).toHaveBeenCalledWith(1, {
      genres: [123],
      startDate: '2023-01-01',
      endDate: '2023-12-31'
    });
  });

  it('should call regular search when no complex filters in onFilterChange', () => {
    const filterState = {
      page: 1,
      category: 'popular'
    };
    component.onFilterChange(filterState);
    expect(tvShowsServiceMock.searchTvShows).toHaveBeenCalledWith(1, undefined, 'popular');
  });
});
