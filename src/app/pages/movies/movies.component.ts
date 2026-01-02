import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Item } from 'src/app/components/item/item';
import { mapMovieToItem } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { MediaListComponent, FilterState } from '../../components/media-list/media-list.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MediaListComponent
  ]
})
export class MoviesComponent implements OnInit {
  movies: Item[] = [];
  genres: any[] = [];

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.moviesService.getMoviesGenres().subscribe((genres) => {
      this.genres = genres;
    });

    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKeyword?: string, category: string = 'popular') {
    this.moviesService.searchMovies(page, searchKeyword, category).subscribe((movies) => {
      this.movies = movies.map(movie => mapMovieToItem(movie));
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies.map(movie => mapMovieToItem(movie));
    });
  }

  onFilterChange(state: FilterState) {
    if (state.search) {
      this.getPagedMovies(state.page, state.search);
    } else {
      const isDefaultSort = state.sort === 'popularity.desc';
      const hasFilters = (state.selectedGenres && state.selectedGenres.length > 0) ||
        (state.watchProviders && state.watchProviders.length > 0) ||
        state.startDate || state.endDate || !isDefaultSort;

      if (hasFilters) {
        const filters = {
          genres: state.selectedGenres,
          watchProviders: state.watchProviders,
          startDate: state.startDate,
          endDate: state.endDate,
          sort: state.sort
        };
        this.moviesService.searchMoviesAdvanced(state.page, filters).subscribe((movies) => {
          this.movies = movies.map(movie => mapMovieToItem(movie));
        });
      } else {
        // category or default
        this.getPagedMovies(state.page, undefined, state.category);
      }
    }
  }
}
