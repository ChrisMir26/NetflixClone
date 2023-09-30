const key = "d326533aa96d02cf007d951b343735e4"


const request ={
    popular:`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    topRated:`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    trending:`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    nowPlaying:`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
    upComing:`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
}


export default request

// https://api.themoviedb.org/3/movie/search?api_key=d326533aa96d02cf007d951b343735e4&language=en-US&page=1
