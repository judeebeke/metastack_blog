import React, { useState, useEffect } from 'react'
import moment from 'moment/moment'

import { getComments } from '../services'

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments({slug}).then(result => {
      setComments(result.comments)
    })
  }, [slug])

  return (
    <>
      {comments.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg pb-12 p-8 mb-8'>
          <h3 className='text-xl mb-8 font-semibold norder-b pb-4'>
            {' '}
            {comments.length} Comments
          </h3>
          {comments.map(comment => {
            return(
              <div
                key={comment.createdAt}
                className='border-8 border-gray-100 mb-4 p-4'
              >
                <p className='mb-4'>
                  <span className='font-semibold'>{comment.name}</span> on{' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className='whitespace-pre-line text-ray-600 w-full'>
                <p>{comment.comment}</p>
                </p>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Comments
