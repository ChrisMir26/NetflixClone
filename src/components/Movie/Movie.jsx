import React,{useEffect} from "react";
import {Link} from "react-router-dom"
import { FaHeart, FaIntercom, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc,getDoc } from "firebase/firestore";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user,fetchSavedShows } = useAuthContext();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      const userDocRef = doc(db, "users", user.email);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const isMovieSaved = userData.savedShows.some((savedShow) => savedShow.id === item.id);
  
        if (!isMovieSaved) {
          // El usuario no ha guardado la película, por lo que la guardamos
          setLike(true);
          setSaved(true);
          await updateDoc(userDocRef, {
            savedShows: arrayUnion({
              id: item.id,
              title: item.title,
              img: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
              overview:item.overview,
              release_date:item.release_date

            }),
          });
        } else {
          // La película ya está guardada, por lo que la eliminamos
          setLike(false);
          setSaved(false);
          const updatedSavedShows = userData.savedShows.filter((savedShow) => savedShow.id !== item.id);
          await updateDoc(userDocRef, {
            savedShows: updatedSavedShows,
          });
        }
      }
    } else {
      alert("Please log in to save a movie");
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        const savedShows = await fetchSavedShows(user.email);
        localStorage.setItem("savedShows", JSON.stringify(savedShows));

        // Verificar si el item.id está en savedShows para establecer el estado "like"
        if (savedShows.some((show) => show.id === item.id)) {
          setLike(true);
        }
      }
    };

    fetchData();
  }, [user?.email]);






  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 ">

      <img
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item.title}
        className="w-full h-auto inline-block"
      />

      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 text-white opacity-0 hover:opacity-100 duration-200">
      <Link to={{
          pathname:`/details/${item.id}`,
          }}
        >

        <p className="white-space-normal text-xs md:text-xl font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        </Link>

        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute left-4 top-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute left-4 top-4 text-gray-300" />
          )}
        </p>
      </div>
    

    </div>
  );
};

export default Movie;
