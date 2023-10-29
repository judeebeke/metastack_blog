import { CalendarDaysIcon } from '@heroicons/react/24/solid'
import moment from 'moment/moment'
import Image from 'next/image'
import React from 'react'
import { RichText } from '@graphcms/rich-text-react-renderer'

const PostDetail = ({ post }) => {
  return (
    <div className='bg-white shadow-lg rounded lg:p-8 pb-12 mb-8'>
      <div className='relative w-full h-80 overflow-hidden shadow-md mb-6'>
        <Image
          src={post.featureImage.url}
          alt={post.title}
          fill
          priority
          className='object-top absolute object-cover rounded-t-lg'
        />
      </div>
      <div className='relative px-4 lg:px-0'>
        <div className='flex items-center mb-8 w-full'>
          <div className='relative flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              width={30}
              height={30}
              className='align-middle rounded-full'
              priority
            />
            <p className='inline align-middle text-gray-700 ml-2 text-lg'>
              {post.author.name}
            </p>
          </div>
          <div className='flex items-center justify-center font-medium text-gray-700 gap-3'>
            <CalendarDaysIcon className='h-6 w-6 text-gray-800' />
            <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>
        <h1 className='mb-8 text-3xl font-semibold'>{post.title}</h1>

        <RichText
          content={post.content.raw.children}
          renderers={{
            h1: ({ children, key }) => {
              return (
                <h1 key={key} className='text-[1.8rem] font-semibold mb-4'>
                  {children}
                </h1>
              )
            },
            h2: ({ children, key }) => {
              return (
                <h2 key={key} className='text-[1.3rem] font-semibold mb-4'>
                  {children}
                </h2>
              )
            },
            h3: ({ children, key }) => {
              return (
                <h3 key={key} className='text-xl font-semibold mb-4'>
                  {children}
                </h3>
              )
            },
            h4: ({ children, key }) => {
              return (
                <h4 key={key} className='text-md font-semibold mb-4'>
                  {children}
                </h4>
              )
            },
            h5: ({ children, key }) => {
              return (
                <h5 key={key} className='text-sm font-semibold mb-3'>
                  {children}
                </h5>
              )
            },
            h6: ({ children, key }) => {
              return (
                <h6 key={key} className='text-xs font-semibold mb-3'>
                  {children}
                </h6>
              )
            },
            img: ({ src, alt, key }) => {
              return (
                <Image
                  key={key}
                  src={src}
                  alt={alt}
                  width={500}
                  height={300}
                  priority
                  className='object-cover rounded-sm'
                />
              )
            },
            bold: ({ children, key }) => {
              return <strong key={key}>{children}</strong>
            },
            italic: ({ children, key }) => {
              return <em key={key}>{children}</em>
            },
            underline: ({ children, key }) => {
              return <u key={key}>{children}</u>
            },
            code: ({ children, key }) => {
              return (
                <code
                  key={key}
                  className='bg-gray-100 mb-4 p-4 rounded overflow-x-auto'
                >
                  {children}
                </code>
              )
            },
            code_block: ({ children, key }) => {
              return (
                <pre
                  key={key}
                  className='bg-gray-100 mb-4 p-4 rounded overflow-auto max-h-[500px]'
                >
                  {children}
                </pre>
              )
            },
            ul: ({ children, key }) => {
              return (
                <ul key={key} className='mb-8'>
                  {children}
                </ul>
              )
            },
            li: ({ children, key }) => {
              return (
                <li key={key} className='list-decimal mb-4 ms-4'>
                  {children}
                </li>
              )
            },
            p: ({ children, key }) => {
              return (
                <p key={key} className='mb-8'>
                  {children}
                </p>
              )
            },
            a: ({ href, children, openInNewTab }) => (
              <a
                href={href}
                target={openInNewTab ? '_blank' : '_self'}
                className='text-blue-600 hover:text-[#F34807] transition ease-in-out duration-500'
              >
                {children}
              </a>
            )
          }}
        />
      </div>
    </div>
  )
}

export default PostDetail;
