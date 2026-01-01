import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { TvShow, mapTvShowToItem } from 'src/app/models/tv';
import { TvShowsService } from '../../services/tvshows.service';
import { Item } from 'src/app/components/item/item';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  tvShows: Item[] = [];
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
    { name: 'On TV', value: 'on_the_air' },
    { name: 'Airing Today', value: 'airing_today' }
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

  constructor(private tvShowsService: TvShowsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tvShowsService.getTvShowsGenres().subscribe((genres) => {
      this.genres = genres;
    });

    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvShowsByGenre(genreId, 1);
      } else {
        this.getPagedTvShows(1);
      }
    });
  }

  getPagedTvShows(page: number, searchKeyword?: string) {
    if (this.selectedGenres.length > 0 || this.startDate || this.endDate) {
      this.applyFilters(page);
      return;
    }
    this.tvShowsService.searchTvShows(page, searchKeyword, this.category).subscribe((tvShows) => {
      this.tvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }

  getTvShowsByGenre(genreId: string, page: number) {
    this.tvShowsService.getTvShowsByGenre(genreId, page).subscribe((tvShows) => {
      this.tvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }

  applyFilters(page: number = 1) {
    const filters = {
      genres: this.selectedGenres,
      startDate: this.startDate ? this.startDate.toISOString().split('T')[0] : undefined,
      endDate: this.endDate ? this.endDate.toISOString().split('T')[0] : undefined
    };

    this.tvShowsService.searchTvShowsAdvanced(page, filters).subscribe((tvShows) => {
      this.tvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;

    if (this.genreId) {
      this.getTvShowsByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedTvShows(pageNumber, this.searchValue);
      } else if (this.selectedGenres.length > 0 || this.startDate || this.endDate) {
        this.applyFilters(pageNumber);
      } else {
        this.getPagedTvShows(pageNumber);
      }
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedTvShows(1, this.searchValue);
    }
  }

  toggleGenre(genreId: number) {
    if (this.selectedGenres.includes(genreId)) {
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    } else {
      this.selectedGenres.push(genreId);
    }
    this.applyFilters();
  }

  changeCategory(category: string) {
    this.category = category;
    this.selectedGenres = [];
    this.startDate = null;
    this.endDate = null;
    this.getPagedTvShows(1);
  }
}
