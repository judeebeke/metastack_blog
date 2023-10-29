import React from 'react'
import Image from 'next/image';

const Author = ({ author }) => {
  return (
    <div className="relative text-center mt-20 mb-8 p-12 rounded-lg bg-[#F34807] bg-opacity">
      <div className="relative w-full flex justify-center">
     <Image
            src={author.photo.url}
            alt={author.name}
            width={ 80}
            height={80}
            className='absolute align-middle rounded-full -top-24'
            priority
            />
            </div>
          <h3 className='inline align-middle text-white my-4 text-xl font-bold'>
            {author.name}
          </h3>
            <p className="text-white text-lg">{author.bio}</p>
    </div>
  )
};

export default Author
