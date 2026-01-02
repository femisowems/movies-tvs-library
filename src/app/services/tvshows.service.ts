import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TvShow, TvShowCredits, TvShowDto, TvShowImages, TvShowVideoDto } from '../models/tv';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  accessToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBhZjcxOTViYzU0OGZiNTAxNDAxNmZjZGRmNjA5MCIsInN1YiI6IjYyOWVlOTIzODUwMDVkMDBhY2FlMjgzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KlxxHwgsMYDcVWYkyUYdV9tXyVRA03Dw1fLcyNBb7e4'; // Replace with your access token

  constructor(private http: HttpClient) { }

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

  getTvShows(type: string = 'upcoming', count: number = 12) {
    const headers = this.createHeaders();
    const params = this.createParams({
      language: 'en-U'
    });

    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${type}`, {
      headers: headers,
      params: params
    }).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getTvShow(id: string) {
    const headers = this.createHeaders();

    return this.http.get<TvShow>(`${this.baseUrl}/tv/${id}`, {
      headers: headers
    });
  }

  getTvShowVideos(id: string) {
    const headers = this.createHeaders();

    return this.http.get<TvShowVideoDto>(`${this.baseUrl}/tv/${id}/videos`, {
      headers: headers
    }).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getTvShowsGenres() {
    const headers = this.createHeaders();

    return this.http.get<GenresDto>(`${this.baseUrl}/genre/tv/list`, {
      headers: headers
    }).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getTvShowsByGenre(genreId: string, pageNumber: number) {
    const headers = this.createHeaders();
    const params = this.createParams({
      with_genres: genreId,
      page: pageNumber.toString()
    });

    return this.http.get<TvShowDto>(`${this.baseUrl}/discover/tv`, {
      headers: headers,
      params: params
    }).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getTvShowImages(id: string) {
    const headers = this.createHeaders();

    return this.http.get<TvShowImages>(`${this.baseUrl}/tv/${id}/images`, {
      headers: headers
    });
  }

  getTvShowCredits(id: string) {
    const headers = this.createHeaders();

    return this.http.get<TvShowCredits>(`${this.baseUrl}/tv/${id}/credits`, {
      headers: headers
    });
  }

  getTvShowSimilar(id: string) {
    const headers = this.createHeaders();

    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${id}/similar`, {
      headers: headers
    }).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, 12));
      })
    );
  }

  searchTvShows(page: number, searchValue?: string, category: string = 'popular') {
    const headers = this.createHeaders();
    const uri = searchValue ? '/search/tv' : `/tv/${category}`;
    let params = this.createParams({
      page: page.toString(),
    });

    if (searchValue) {
      params = params.set('query', searchValue);
    }

    return this.http.get<TvShowDto>(`${this.baseUrl}${uri}`, {
      headers: headers,
      params: params
    }).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getTvs(type: string = 'popular', count: number = 18) {
    const headers = this.createHeaders();

    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${type}`, {
      headers: headers
    }).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }
  searchTvShowsAdvanced(page: number, filters: { genres?: number[], startDate?: string, endDate?: string, sort?: string, watchProviders?: number[] } = {}) {
    const headers = this.createHeaders();
    let params = this.createParams({
      page: page.toString(),
      'vote_count.gte': '10', // Filter out junk
      'watch_region': 'US' // Required for watch providers
    });

    if (filters.genres && filters.genres.length > 0) {
      params = params.set('with_genres', filters.genres.join(','));
    }

    if (filters.startDate) {
      params = params.set('first_air_date.gte', filters.startDate);
    }

    if (filters.endDate) {
      params = params.set('first_air_date.lte', filters.endDate);
    }

    if (filters.watchProviders && filters.watchProviders.length > 0) {
      params = params.set('with_watch_providers', filters.watchProviders.join('|'));
    }

    if (filters.sort) {
      // Map generic 'release_date' to TV-specific 'first_air_date'
      const sortValue = filters.sort.replace('release_date', 'first_air_date');
      params = params.set('sort_by', sortValue);
    }

    return this.http.get<TvShowDto>(`${this.baseUrl}/discover/tv`, {
      headers: headers,
      params: params
    }).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }
}
