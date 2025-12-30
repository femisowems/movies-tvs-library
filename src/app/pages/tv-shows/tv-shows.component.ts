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
  genreId: string | null = null;
  searchValue: string | null = null;
  category: string = 'popular';
  categories = [
    { name: 'Popular', value: 'popular' },
    { name: 'Top Rated', value: 'top_rated' },
    { name: 'On TV', value: 'on_the_air' },
    { name: 'Airing Today', value: 'airing_today' }
  ];

  constructor(private tvShowsService: TvShowsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
    this.tvShowsService.searchTvShows(page, searchKeyword, this.category).subscribe((tvShows) => {
      this.tvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }

  getTvShowsByGenre(genreId: string, page: number) {
    this.tvShowsService.getTvShowsByGenre(genreId, page).subscribe((tvShows) => {
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

  changeCategory(category: string) {
    this.category = category;
    this.getPagedTvShows(1);
  }
}
