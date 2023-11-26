import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tvshows.service';
import { Genre } from '../../models/genre';
import { moviesGenrePosterMapping, tvsGenrePosterMapping } from './genre-posters';



@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  tvShowGenres: Genre[] = [];
  constructor(private moviesService: MoviesService, private tvShowsService: TvShowsService) {}

  ngOnInit(): void {
    this.moviesService.getMoviesGenres().subscribe((genresData) => {
      this.genres = genresData;
    });

    this.tvShowsService.getTvShowsGenres().subscribe((genresData) => {
      this.tvShowGenres = genresData;
    });
  }
  

  getBackgroundImage(genreId: string): string {
    // Define a mapping of genre IDs to background image URLs

  // Check if the genre ID exists in the mapping; if not, use a default background
  console.log("genreID: " + genreId);
  const backgroundImageUrl = moviesGenrePosterMapping[genreId] || tvsGenrePosterMapping[genreId] || 'url(/assets/posters/genre000.jpg)';
  
  return backgroundImageUrl;
}
}
