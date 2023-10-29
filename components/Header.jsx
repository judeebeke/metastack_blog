import { getCategories } from '@/services'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import React, { useContext } from 'react'

const Header = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(result => setCategories(result.categories))
  }, [])

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='border-b w-full inline-block border-[#F34807] py-6'>
        <div className='md:float-left block'>
          <Link href='/'>
            <span className='cursor-pointer font-bold text-4xl text-[#F34807]'>
              METASTACK
            </span>
          </Link>
        </div>
        <div className='hidden md:float-right md:contents'>
          {categories
            .slice()
            .reverse()
            .map(category => {
              return (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  <span className='md:float-right mt-2 align-middle text-[#F34807] ml-4 font-semibold cursor-pointer'>
                    {category.name}
                  </span>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Header
