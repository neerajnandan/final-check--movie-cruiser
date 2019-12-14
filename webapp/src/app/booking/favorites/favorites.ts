import { Movie } from "src/app/movie/movie-info/movie";

export interface Favorites{
    // favoritesItems: [{
    //         itemId: string;
    //         movieItem: Movie;
    // }];
    favoritesItems: Movie[],
    noOfFavorites: number;
};