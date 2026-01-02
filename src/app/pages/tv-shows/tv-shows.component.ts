import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { TvShow, mapTvShowToItem } from 'src/app/models/tv';
import { TvShowsService } from '../../services/tvshows.service';
import { Item } from 'src/app/components/item/item';
import { MediaListComponent, FilterState } from '../../components/media-list/media-list.component';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MediaListComponent
  ]
})
export class TvShowsComponent implements OnInit {
  tvShows: Item[] = [];
  genres: any[] = [];

  constructor(private tvShowsService: TvShowsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tvShowsService.getTvShowsGenres().subscribe((genres) => {
      this.genres = genres;
    });

    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.getTvShowsByGenre(genreId, 1);
      } else {
        this.getPagedTvShows(1);
      }
    });
  }

  getPagedTvShows(page: number, searchKeyword?: string, category: string = 'popular') {
    this.tvShowsService.searchTvShows(page, searchKeyword, category).subscribe((tvShows) => {
      this.tvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }

  getTvShowsByGenre(genreId: string, page: number) {
    this.tvShowsService.getTvShowsByGenre(genreId, page).subscribe((tvShows) => {
      this.tvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }

  onFilterChange(state: FilterState) {
    if (state.search) {
      this.getPagedTvShows(state.page, state.search);
    } else if (state.category && state.category !== 'popular' && !state.selectedGenres && !state.startDate) {
      this.getPagedTvShows(state.page, undefined, state.category);
    } else if (state.selectedGenres || state.startDate || state.endDate) {
      const filters = {
        genres: state.selectedGenres,
        startDate: state.startDate,
        endDate: state.endDate
      };
      this.tvShowsService.searchTvShowsAdvanced(state.page, filters).subscribe((tvShows) => {
        this.tvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
      });
    } else {
      this.getPagedTvShows(state.page, undefined, state.category);
    }
  }
}
