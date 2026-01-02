import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './pages/genres/genres.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { TvShowComponent } from './pages/tvshow/tvshow.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MyListComponent } from './pages/my-list/my-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'movies',
    component: MoviesComponent,
    data: { title: 'Movies' }
  },
  {
    path: 'movies/genres/:genreId',
    component: MoviesComponent,
    data: { title: 'Movies' }
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
    data: { title: 'Movie Details' }
  },
  {
    path: 'tvshows',
    component: TvShowsComponent,
    data: { title: 'TV Shows' }
  },
  {
    path: 'tvshow/:id',
    component: TvShowComponent,
    data: { title: 'TV Show Details' }
  },
  {
    path: 'tvshows/genres/:genreId',
    component: TvShowsComponent,
    data: { title: 'TV Shows' }
  },
  {
    path: 'genres',
    component: GenresComponent,
    data: { title: 'Genres' }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { title: 'Search' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' }
  },
  {
    path: 'mylist',
    component: MyListComponent,
    data: { title: 'My List' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
