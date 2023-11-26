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
    28: 'url(/assets/posters/genre28.jpg)', //action movie
    12: 'url(/assets/posters/genre12.jpg)', //adventure movie
    16: 'url(/assets/posters/genre16.jpg)', //animation movie 
    35: 'url(/assets/posters/genre35.jpg)', //comedy movie 
    80: 'url(/assets/posters/genre80.jpg)', //crime movie
    99: 'url(/assets/posters/genre99.jpg)', //documentary movie
    18: 'url(/assets/posters/genre18.jpg)', //drama movie 
    10751: 'url(/assets/posters/genre10751.jpg)', //family movie 
    14: 'url(/assets/posters/genre14.jpg)', //fantasy movie
    36: 'url(/assets/posters/genre36.jpg)', //history movie
    27: 'url(/assets/posters/genre27.jpg)', //horror movie 
    10402: 'url(/assets/posters/genre10402.jpg)', //music movie 
    9648: 'url(/assets/posters/genre9648.jpg)', //mystery movie
    10749: 'url(/assets/posters/genre10749.jpg)', //romance movie
    878: 'url(/assets/posters/genre878.jpg)', //science fiction movie 
    10770: 'url(/assets/posters/genre10770.jpg)', //tv movie 
    53: 'url(/assets/posters/genre53.jpg)', //thriller movie
    10752: 'url(/assets/posters/genre10752.jpg)', //war movie 
    37: 'url(/assets/posters/genre37.jpg)', //western movie 
    // Add more mappings as needed based on genre IDs
  };

  // Check if the genre ID exists in the mapping; if not, use a default background
  const backgroundImageUrl = backgroundImageMapping[genreId] || 'url(/assets/posters/genre28.jpg)';

  console.log("Background Image: " + backgroundImageUrl);
  
  return backgroundImageUrl;
}
}
