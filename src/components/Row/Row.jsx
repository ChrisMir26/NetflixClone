import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Movie from "../Movie/Movie";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [fetchURL]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        <div id={"slider"} className="flex justify-center flex-wrap">
          {movies?.map((item, id) => {
            return(
           <Movie key= {id}item={item}/>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Row;
