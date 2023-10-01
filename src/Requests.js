const key = process.env.REACT_APP_IMDB_API_KEY     


const request ={
    popular:`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    topRated:`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    trending:`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    nowPlaying:`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
    upComing:`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
}


export default request

// https://api.themoviedb.org/3/movie/search?api_key=d326533aa96d02cf007d951b343735e4&language=en-US&page=1
