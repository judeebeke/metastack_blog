import Image from 'next/image'
import Link from 'next/link'

import { CalendarDaysIcon } from '@heroicons/react/24/solid'
import moment from 'moment/moment'
import { getCategories, getCategoriesPosts } from '@/services'

const Category = ({ categories }) => {
  return (
 <div className="ccontainer mx-auto px-10 mb-8">
    {categories.map((category) => <div key={category.id} className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 text-gray-950'>
    <div className='relative overflow-hidden shadow-md pb-8 w-full h-80 mb-6'>
    <Image
        src={category.featureImage.url}
        alt={category.title}
        fill // Add this line to maintain aspect ratio
        priority
        className='object-top absolute object-cover shadow-lg rounded-t-lg lg:rounded-lg'
    />
    </div>
    <h1 className='flex flex-col px-4 transition duration-700 text-center pb-0 mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold'>
    <Link href={`/post/${category.slug}`}>{category.title}</Link>
    </h1>
    <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
    <div className='relative flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
        <Image
        src={category.author.photo.url}
        alt={category.author.name}
        width={30}
        height={30}
        className='align-middle rounded-full'
        priority
        />
        <p className='inline align-middle text-gray-700 ml-2 text-lg'>
        {category.author.name}
        </p>
    </div>
    <div className='flex items-center justify-center font-medium text-gray-700 gap-3'>
        <CalendarDaysIcon className='h-6 w-6 text-gray-800' />
        <span>{moment(category.createdAt).format('MMM DD, YYYY')}</span>
    </div>
    </div>
    <p className='text-center text-lg text-gray-700 font-normal px-4 lg:p-20 mb-8'>
    {category.excerpt}
    </p>
    <div className='text-center'>
    <Link href={`/post/${category.slug}`}>
        <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
        Continue Reading
        </span>
    </Link>
    </div>
</div>)}
</div>
  )
}

export default Category



export const getStaticProps = async ({params}) => {
    let slug = params.slug;
    const data = (await getCategoriesPosts({slug})) || []; 
     return {
     props: {
      categories: data.categories[0].posts,
       },
     }
    }
  
    export const getStaticPaths = async () => {
      const result = await getCategories();
      
      return {
          paths: result.categories.map((slug) => ({params: slug})),
          fallback: false,
      }
    }
