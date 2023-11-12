import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  accessToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBhZjcxOTViYzU0OGZiNTAxNDAxNmZjZGRmNjA5MCIsInN1YiI6IjYyOWVlOTIzODUwMDVkMDBhY2FlMjgzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KlxxHwgsMYDcVWYkyUYdV9tXyVRA03Dw1fLcyNBb7e4'; // Replace with your access token

  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
  }

  private createParams(params: any = {}): HttpParams {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return httpParams;
  }

  getMovies(type: string = 'upcoming', count: number = 12) {
    const headers = this.createHeaders();
    const params = this.createParams({});

    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}`, {
      headers: headers,
      params: params
    }).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getMovie(id: string) {
    const headers = this.createHeaders();

    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}`, {
      headers: headers
    });
  }

  getMovieVideos(id: string) {
    const headers = this.createHeaders();

    return this.http.get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos`, {
      headers: headers
    }).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getMoviesGenres() {
    const headers = this.createHeaders();

    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list`, {
      headers: headers
    }).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getMoviesByGenre(genreId: string, pageNumber: number) {
    const headers = this.createHeaders();
    const params = this.createParams({
      with_genres: genreId,
      page: pageNumber.toString()
    });

    return this.http.get<MovieDto>(`${this.baseUrl}/discover/movie`, {
      headers: headers,
      params: params
    }).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getMovieImages(id: string) {
    const headers = this.createHeaders();

    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images`, {
      headers: headers
    });
  }

  getMovieCredits(id: string) {
    const headers = this.createHeaders();

    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits`, {
      headers: headers
    });
  }

  getMovieSimilar(id: string) {
    const headers = this.createHeaders();

    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${id}/similar`, {
      headers: headers
    }).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, 12));
      })
    );
  }

  searchMovies(page: number, searchValue?: string) {
    const headers = this.createHeaders();
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    const params = this.createParams({
      page: page.toString(),
    });

    if (searchValue) {
      params.set('query', searchValue);
    }

    return this.http.get<MovieDto>(`${this.baseUrl}${uri}`, {
      headers: headers,
      params: params
    }).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }
}
