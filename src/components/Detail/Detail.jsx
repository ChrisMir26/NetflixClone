import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import {setDoc,doc,getDoc,addDoc,collection} from "firebase/firestore"
import { auth,db } from "../../firebase.js";
import { FaStar } from 'react-icons/fa';




const Detail = () => {
  const {id} = useParams()
  const numberID = Number(id)
  const {allMovies} = useAuthContext()
  const movie = allMovies.find(item => item.id === numberID)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 440);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>

<div className="w-full h-full text-white">
      <div className="w-full h-full">
        <div className="w-full h-full absolute bg-gradient-to-r from-black"></div>
        <img
         src={
          isSmallScreen
            ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
            : `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
        }
          alt={movie?.title}
          className="w-full h-[100vh] object-cover"
        />

        <div className="absolute w-full top-[40%] md:top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl">{movie?.title}</h1>
            <div className="my-4">
          <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
            Play
          </button>
          <button className="border text-white ml-4 border-gray-300 py-2 px-5">
            Watch Later
          </button>
          </div>
          <p className="text-gray-400 text-md my-3">Released: {movie?.release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-md my-3 text-gray-200 ">
            {movie?.overview}
          </p>
        
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-md my-3 text-gray-200 ">

          <FaStar size={30} color="#FFD700" />  {movie?.vote_average}/10
          </p>        </div>
      </div>
    </div>
    </>
  )
}

export default Detail