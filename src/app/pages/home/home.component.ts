import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/components/item/item';
import { TvShowsService } from 'src/app/services/tvshows.service';
import { mapMovieToItem, Movie } from '../../models/movie';
import { mapTvShowToItem, TvShow } from '../../models/tv';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Movie Lists
  popularMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  upcomingMovies: Item[] = [];
  nowPlayingMovies: Item[] = [];

  // TV Show Lists
  popularTvShows: Item[] = [];
  topRatedTvShows: Item[] = [];
  onTheAirTvShows: Item[] = [];
  airingTodayTvShows: Item[] = [];

  // Display Lists
  moviesDisplay: Item[] = [];
  tvShowsDisplay: Item[] = [];

  // Selected Tabs
  selectedMovieTab: string = 'popular';
  selectedTvTab: string = 'popular';

  constructor(private moviesService: MoviesService, private tvShowsService: TvShowsService) { }

  ngOnInit(): void {
    // Fetch Movies
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies.map((movie) => mapMovieToItem(movie));
      this.moviesDisplay = this.popularMovies; // Default display
    });
    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies.map((movie) => mapMovieToItem(movie));
    });
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies.map((movie) => mapMovieToItem(movie));
    });
    // For 'now_playing' (In Theatres)
    this.moviesService.getMovies('now_playing').subscribe((movies) => {
      this.nowPlayingMovies = movies.map((movie) => mapMovieToItem(movie));
    });

    // Fetch TV Shows
    this.tvShowsService.getTvs('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
      this.tvShowsDisplay = this.popularTvShows; // Default display
    });
    this.tvShowsService.getTvs('top_rated').subscribe((tvShows) => {
      this.topRatedTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
    });
    this.tvShowsService.getTvs('on_the_air').subscribe((tvShows) => {
      this.onTheAirTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
    });
    this.tvShowsService.getTvs('airing_today').subscribe((tvShows) => {
      this.airingTodayTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
    });
  }

  changeMovieCategory(category: string) {
    this.selectedMovieTab = category;
    switch (category) {
      case 'popular':
        this.moviesDisplay = this.popularMovies;
        break;
      case 'top_rated':
        this.moviesDisplay = this.topRatedMovies;
        break;
      case 'upcoming':
        this.moviesDisplay = this.upcomingMovies;
        break;
      case 'now_playing':
        this.moviesDisplay = this.nowPlayingMovies;
        break;
    }
  }

  changeTvCategory(category: string) {
    this.selectedTvTab = category;
    switch (category) {
      case 'popular':
        this.tvShowsDisplay = this.popularTvShows;
        break;
      case 'top_rated':
        this.tvShowsDisplay = this.topRatedTvShows;
        break;
      case 'on_the_air':
        this.tvShowsDisplay = this.onTheAirTvShows;
        break;
      case 'airing_today':
        this.tvShowsDisplay = this.airingTodayTvShows;
        break;
    }
  }
}
