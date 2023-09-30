import React from 'react'
import {FaHeart, FaIntercom, FaRegHeart} from "react-icons/fa"
import { useState } from "react";



const Movie = ({item}) => {
    const [like, setLike] = useState(false)

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-bloc cursor-pointer relative p-2 r">
    <img
      src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
      alt={item.title}
      className="w-full h-auto block"
    />
    <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 text-white opacity-0 hover:opacity-100 duration-200">
      <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">{item?.title}</p>
      <p>
        {like ? <FaHeart className="absolute left-4 top-4 text-gray-300"/> : <FaRegHeart className="absolute left-4 top-4 text-gray-300"/>}
      </p>
    </div>
  </div>
  )
}

export default Movie