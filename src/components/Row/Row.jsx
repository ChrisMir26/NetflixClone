import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Movie from "../Movie/Movie";
import {MdChevronLeft, MdChevronRight} from "react-icons/md"
 
const Row = ({ title, fetchURL ,rowID}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(fetchURL) 
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [fetchURL]);

  // Función para desplazar el slider hacia la izquierda
const slideLeft = () => {
  // Obtener el elemento del slider según su identificador (rowID)
  var slider = document.getElementById('slider' + rowID);
  // Desplazar el contenido del slider hacia la izquierda en 500 píxeles
  slider.scrollLeft = slider.scrollLeft - 500;
}

// Función para desplazar el slider hacia la derecha
const slideRight = () => {
  // Obtener el elemento del slider según su identificador (rowID)
  var slider = document.getElementById('slider' + rowID);
  // Desplazar el contenido del slider hacia la derecha en 500 píxeles
  slider.scrollLeft = slider.scrollLeft + 500;
}



  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft size={40} onClick={slideLeft} className="left-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" />
        <div id={"slider" + rowID} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {movies?.map((item, id) => {
            return(
           <Movie key= {id}item={item}/>
            )
          })}
        </div>
        <MdChevronRight  onClick={slideRight} size={40} className="right-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"/>
      </div>
    </>
  );
};

export default Row;
