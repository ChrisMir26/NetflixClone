import React from 'react'
import SavedShows from '../components/SavedShows/SavedShows'
import wallpaper from "../images/background.webp"

const Account = () => {
  return (
   <>
     <div className='w-full text-white'>

      <img src={wallpaper} alt="Img background" className='w-full h-[400px] object-cover' />
        <div className='bg-black/50 fixed top-0 left-0 w-full h-[550px]'></div>
        <div  className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My shows</h1>


        </div>

     </div>
     <SavedShows />
   
   </>
  )
}

export default Account