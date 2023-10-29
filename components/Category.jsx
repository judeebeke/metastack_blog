import { getCategories } from "@/services"
import Link from "next/link"
import { useEffect, useState } from "react"

const Category = () => {
  const [categories,  setCategories] = useState([])

  useEffect(() => {
      getCategories().then((result) => setCategories(result.categories))
  }, [])

   return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-8 mb-6 text-gray-950">
      <h3 className='text-xl mb-8 font-semibold border-border-b pb-4'>
        Categories
      </h3>
      {categories.map((category => {
        return (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="cursor-pointer block pb-3 mb-3 transition duration-700 hover:text-pink-600">{category.name}</span>
          </Link>
        )
      }))}
    </div>
  )
}

export default Category