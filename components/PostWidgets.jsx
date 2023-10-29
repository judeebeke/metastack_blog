import { useState, useEffect } from 'react'
import moment from 'moment/moment'
import Link from 'next/link'
import { getRecentPost, getSimilarPost } from '@/services'
import Image from 'next/image'

const PostWidgets = ({ categories, slug }) => {
  const [relatedPost, setRelatedPost] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPost({categories, slug}).then(result => {
        return setRelatedPost(result.posts)
      })
    } else {
      getRecentPost().then(result => setRelatedPost(result.posts))
    }
  }, [slug, categories])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-6 text-gray-950'>
      <h3 className='text-xl mb-4 font-semibold border-border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPost.map(post => {
        return (
          <div key={post.title} className='w-full flex items-center mb-4'>
            <div className='w-16 flex-none relative'>
              <Image
                height={60}
                width={60}
                src={post.featureImage.url}
                alt={post.title}
                priority
              />
            </div>
            <div className='flex-grow ml-4'>
              <p className='font-gray-500 text-xs'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} className='text-md'>
                {post.title}
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostWidgets
