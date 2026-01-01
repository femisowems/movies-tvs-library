import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Item } from '../../components/item/item';
import { ItemComponent } from '../../components/item/item.component'; // Added import for usage
import { MoviesService } from '../../services/movies.service';
import { TvShowsService } from '../../services/tvshows.service';
import { mapMovieToItem } from '../../models/movie';
import { mapTvShowToItem } from '../../models/tv';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true, // Added
    imports: [CommonModule, ItemComponent] // Added
})
export class SearchComponent implements OnInit {
    searchValue: string | null = null;
    movies: Item[] = [];
    tvShows: Item[] = [];

    // Tab state
    activeTab: 'movies' | 'tvshows' = 'movies';

    constructor(
        private route: ActivatedRoute,
        private moviesService: MoviesService,
        private tvShowsService: TvShowsService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.pipe(take(1)).subscribe((params) => {
            if (params['search']) {
                this.searchValue = params['search'];
                this.search();
            }
        });
    }

    search() {
        if (this.searchValue) {
            // Search Movies
            this.moviesService.searchMovies(1, this.searchValue).subscribe((movies) => {
                this.movies = movies.map((movie) => mapMovieToItem(movie));
            });

            // Search TV Shows
            this.tvShowsService.searchTvShows(1, this.searchValue).subscribe((tvShows) => {
                this.tvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
            });
        }
    }

    setActiveTab(tab: 'movies' | 'tvshows') {
        this.activeTab = tab;
    }
}
