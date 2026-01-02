import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Item } from 'src/app/components/item/item';
import { mapMovieToItem, Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { PaginatorModule } from 'primeng/paginator';
import { ItemComponent } from '../../components/item/item.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    ItemComponent,
    InputTextModule,
    FormsModule,
    CalendarModule,
    AccordionModule,
    CheckboxModule,
    DropdownModule,
    RadioButtonModule
  ]
})
export class MoviesComponent implements OnInit {
  movies: Item[] = [];
  genres: any[] = [];
  selectedGenres: number[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  genreId: string | null = null;
  searchValue: string | null = null;
  category: string = 'popular';
  categories = [
    { name: 'Popular', value: 'popular' },
    { name: 'Top Rated', value: 'top_rated' },
    { name: 'Upcoming', value: 'upcoming' },
    { name: 'Now Playing', value: 'now_playing' }
  ];

  sortOptions = [
    { label: 'Popularity Descending', value: 'popularity.desc' },
    { label: 'Popularity Ascending', value: 'popularity.asc' },
    { label: 'Rating Descending', value: 'vote_average.desc' },
    { label: 'Rating Ascending', value: 'vote_average.asc' },
    { label: 'Release Date Descending', value: 'first_air_date.desc' },
    { label: 'Release Date Ascending', value: 'first_air_date.asc' }
  ];
  showMeValue: string = 'everything';
  sortBy: string = 'popularity.desc';

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.moviesService.getMoviesGenres().subscribe((genres) => {
      this.genres = genres;
    });

    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        // Check for query params for search
        this.route.queryParams.pipe(take(1)).subscribe((params) => {
          if (params['search']) {
            this.searchValue = params['search'];
            this.getPagedMovies(1, this.searchValue || undefined); // Fix type mismatch
          } else {
            this.getPagedMovies(1);
          }
        });
      }
    });
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    if (this.selectedGenres.length > 0 || this.startDate || this.endDate) {
      this.applyFilters(page);
      return;
    }
    this.moviesService.searchMovies(page, searchKeyword, this.category).subscribe((movies) => {
      this.movies = movies.map(movie => mapMovieToItem(movie));
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies.map(movie => mapMovieToItem(movie));
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;

    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }

  changeCategory(category: string) {
    this.category = category;
    this.selectedGenres = [];
    this.startDate = null;
    this.endDate = null;
    this.getPagedMovies(1);
  }

  applyFilters(page: number = 1) {
    const filters = {
      genres: this.selectedGenres,
      startDate: this.startDate ? this.startDate.toISOString().split('T')[0] : undefined,
      endDate: this.endDate ? this.endDate.toISOString().split('T')[0] : undefined
    };

    this.moviesService.searchMoviesAdvanced(page, filters).subscribe((movies) => {
      this.movies = movies.map(movie => mapMovieToItem(movie));
    });
  }

  toggleGenre(genreId: number) {
    if (this.selectedGenres.includes(genreId)) {
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    } else {
      this.selectedGenres.push(genreId);
    }
    this.applyFilters();
  }
}
