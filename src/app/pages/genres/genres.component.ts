import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tvshows.service';
import { Genre } from '../../models/genre';

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

  getBackgroundImage(genreId: number): string {
    // Define a mapping of genre IDs to background image URLs
  const backgroundImageMapping: { [key: number]: string } = {
    28: 'url(/assets/posters/genre28.jpg)',
    2: 'url(/assets/posters/genre2.jpg)',
    3: 'url(/assets/posters/genre3.jpg)',
    // Add more mappings as needed based on genre IDs
  };

  // Check if the genre ID exists in the mapping; if not, use a default background
  const backgroundImageUrl = backgroundImageMapping[genreId] || 'url(/assets/posters/genre28.jpg)';
  
  return backgroundImageUrl;
}
}
