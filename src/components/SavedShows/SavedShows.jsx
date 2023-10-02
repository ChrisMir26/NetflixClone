import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import {MdChevronLeft, MdChevronRight} from "react-icons/md"
import { useAuthContext } from '../../context/AuthContext';
import {db} from "../../firebase"
import {updateDoc,doc,onSnapshot} from "firebase/firestore"
import {AiOutlineClose} from "react-icons/ai"

const SavedShows = () => {
const [movies,setMovies] = useState([])
const {user} = useAuthContext()

      // Función para desplazar el slider hacia la izquierda
const slideLeft = () => {
    // Obtener el elemento del slider según su identificador (rowID)
    var slider = document.getElementById('slider');
    // Desplazar el contenido del slider hacia la izquierda en 500 píxeles
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  
  // Función para desplazar el slider hacia la derecha
  const slideRight = () => {
    // Obtener el elemento del slider según su identificador (rowID)
    var slider = document.getElementById('slider');
    // Desplazar el contenido del slider hacia la derecha en 500 píxeles
    slider.scrollLeft = slider.scrollLeft + 500;
  } 

  useEffect(() => {
    onSnapshot(doc(db, "users", user?.email), (doc) => {
        setMovies(doc.data()?.savedShows);
    });
  },[user?.email])
  
  const movieRef = doc(db,"users",`${user?.email}`)
  const deleteShow = async (id) =>{
    try {
        const result = movies.filter(item => item.id !== id)
        await updateDoc(movieRef,{
            savedShows:result,
        })
        
    } catch (error) {
        console.log(error)
    }

  }


  return (
    <>
      <div className="relative flex items-center group">
        <MdChevronLeft size={40} onClick={slideLeft} className="left-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" />
        <div id={"slider"} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {movies?.map((item, id) => {
            return(
                <div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 ">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item?.img }`}
                  alt={item.title}
                  className="w-full h-auto inline-block"
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 text-white opacity-0 hover:opacity-100 duration-200">
                  <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                  </p>
                  <p onClick={()=>{deleteShow(item.id)}} 
                  className='absolute text-gray-300 top-4 right-4'>
                     <AiOutlineClose/>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <MdChevronRight  onClick={slideRight} size={40} className="right-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"/>
      </div>
    </>
   )
}

export default SavedShows