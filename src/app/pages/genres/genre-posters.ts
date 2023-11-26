// Define constants for tv show genres
export const movies = {
    GENRE_ACTION : 'movies_28',
    GENRE_ADVENTURE : 'movies_12',
    GENRE_ANIMATION : 'movies_16',
    GENRE_COMEDY : 'movies_35',
    GENRE_CRIME : 'movies_80',
    GENRE_DOCUMENTARY : 'movies_99',
    GENRE_DRAMA : 'movies_18',
    GENRE_FAMILY : 'movies_10751',
    GENRE_FANTASY : 'movies_14',
    GENRE_HISTORY : 'movies_36',
    GENRE_HORROR : 'movies_27',
    GENRE_MUSIC : 'movies_10402',
    GENRE_MYSTERY : 'movies_9648',
    GENRE_ROMANCE : 'movies_10749',
    GENRE_SCIENCE_FICTION : 'movies_878',
    GENRE_TV_SHOW : 'movies_10770',
    GENRE_THRILLER : 'movies_53',
    GENRE_WAR :'movies_10752',
    GENRE_WESTERN : 'movies_37',

}


// Define constants for tv show genres
export const tvs = {
    GENRE_ACTION_ADVENTURE : 'tvs_10759',
    GENRE_ANIMATION : 'tvs_16', 
    GENRE_COMEDY : 'tvs_35',
    GENRE_CRIME : 'tvs_80',
    GENRE_DOCUMENTARY : 'tvs_99',
    GENRE_DRAMA : 'tvs_18',
    GENRE_FAMILY : 'tvs_10751',
    GENRE_KIDS : 'tvs_10762',
    GENRE_MYSTERY : 'tvs_9648',
    GENRE_NEWS : 'tvs_10763',
    GENRE_REALITY : 'tvs_10764',
    GENRE_SCIFI_FANTASY : 'tvs_10765',
    GENRE_SOAP : 'tvs_10766',
    GENRE_TALK : 'tvs_10767',
    GENRE_WAR_POLITICS : 'tvs_10768',
    GENRE_WESTERN : 'tvs_37',
}


// Mapping for movie genres
export const moviesGenrePosterMapping: { [key: string]: string } = {
    [movies.GENRE_ACTION]: 'url(/assets/posters/movies/genre28.jpg)',
    [movies.GENRE_ADVENTURE]: 'url(/assets/posters/movies/genre12.jpg)',
    [movies.GENRE_ANIMATION]: 'url(/assets/posters/movies/genre16.jpg)', //animation movie 
    [movies.GENRE_COMEDY]: 'url(/assets/posters/movies/genre35.jpg)', //comedy movie 
    [movies.GENRE_CRIME]: 'url(/assets/posters/movies/genre80.jpg)', //crime movie
    [movies.GENRE_DOCUMENTARY]: 'url(/assets/posters/movies/genre99.jpg)', //documentary movie
    [movies.GENRE_DRAMA]: 'url(/assets/posters/movies/genre18.jpg)', //drama movie 
    [movies.GENRE_FAMILY]: 'url(/assets/posters/movies/genre10751.jpg)', //family movie 
    [movies.GENRE_FANTASY]: 'url(/assets/posters/movies/genre14.jpg)', //fantasy movie
    [movies.GENRE_HISTORY]: 'url(/assets/posters/movies/genre36.jpg)', //history movie
    [movies.GENRE_HORROR]: 'url(/assets/posters/movies/genre27.jpg)', //horror movie 
    [movies.GENRE_MUSIC]: 'url(/assets/posters/movies/genre10402.jpg)', //music movie 
    [movies.GENRE_MYSTERY]: 'url(/assets/posters/movies/genre9648.jpg)', //mystery movie
    [movies.GENRE_ROMANCE]: 'url(/assets/posters/movies/genre10749.jpg)', //romance movie
    [movies.GENRE_SCIENCE_FICTION]: 'url(/assets/posters/movies/genre878.jpg)', //science fiction movie 
    [movies.GENRE_TV_SHOW]: 'url(/assets/posters/movies/genre10770.jpg)', //tv movie 
    [movies.GENRE_THRILLER]: 'url(/assets/posters/movies/genre53.jpg)', //thriller movie
    [movies.GENRE_WAR]: 'url(/assets/posters/movies/genre10752.jpg)', //war movie 
    [movies.GENRE_WESTERN]: 'url(/assets/posters/movies/genre37.jpg)', //western movie 
    // Use constants for other movie genres
  };
  
  // Mapping for TV show genres
  export const tvsGenrePosterMapping: { [key: string]: string } = {
    [tvs.GENRE_DRAMA]: 'url(/assets/posters/tvs/genre18.jpg)',
    [tvs.GENRE_COMEDY]: 'url(/assets/posters/tvs/genre35.jpg)',
    [tvs.GENRE_ACTION_ADVENTURE]: 'url(/assets/posters/tvs/genre10759.jpg)',
    [tvs.GENRE_ANIMATION]: 'url(/assets/posters/tvs/genre16.jpg)',
    [tvs.GENRE_CRIME]: 'url(/assets/posters/tvs/genre80.jpg)',
    [tvs.GENRE_DOCUMENTARY]: 'url(/assets/posters/tvs/genre99.jpg)',
    [tvs.GENRE_FAMILY]: 'url(/assets/posters/tvs/genre10751.jpg)',
    [tvs.GENRE_KIDS]: 'url(/assets/posters/tvs/genre10762.jpg)',
    [tvs.GENRE_MYSTERY]: 'url(/assets/posters/tvs/genre9648.jpg)',
    [tvs.GENRE_NEWS]: 'url(/assets/posters/tvs/genre10763.jpg)',
    [tvs.GENRE_REALITY]: 'url(/assets/posters/tvs/genre10764.jpg)',
    [tvs.GENRE_SCIFI_FANTASY]: 'url(/assets/posters/tvs/genre10765.jpg)',
    [tvs.GENRE_SOAP]: 'url(/assets/posters/tvs/genre10766.jpg)',
    [tvs.GENRE_TALK]: 'url(/assets/posters/tvs/genre10767.jpg)',
    [tvs.GENRE_WAR_POLITICS]: 'url(/assets/posters/tvs/genre10768.jpg)',
    [tvs.GENRE_WESTERN]: 'url(/assets/posters/tvs/genre37.jpg)',
  };
