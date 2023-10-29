import React, {useState, useEffect, useRef} from 'react'
import { submitComment } from '@/services'


const CommentForm = ({slug}) => {

  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(null)
  
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
      nameEl.current.value = window.localStorage.getItem('meta-name')
      nameEl.current.value = window.localStorage.getItem('email-name')
  }, [])

  const handleCommentSubmission = () => {
    setError(false);
    let commentValue = commentEl.current.value;
    let nameValue = nameEl.current.value;
    let emailValue = emailEl.current.value;
    let storeDataValue = storeDataEl.current.checked;

    if(!commentValue || !nameValue || !emailValue ) {
    setError(true);
        return
    }

    const commentObj = {
      name: nameValue, email: emailValue, comment: commentValue, slug
    }

    if(storeDataValue) {
      window.localStorage.setItem('meta-name', nameValue)
      window.localStorage.setItem('meta-email', emailValue)
    } else {
      window.localStorage.removeItem('meta-name', nameValue)
      window.localStorage.removeItem('meta-email', emailValue)
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)
      setTimeout(() => {
      setShowSuccessMessage(false)
      }, 5000)
    })
  }
 
  return (
    <div className=" bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 p">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
    Leave a Reply
      </h3>
    <div className="grid grid-cols-1 gap4 mb-4">
      <textarea ref={commentEl} className="p-4 outline-none w-ful rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Comment" name="comment" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" ref={nameEl} className="p-2 px-4 outline-none w-ful rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="name" placeholder='Name' />
        <input type="text" ref={emailEl} className="p-2 px-4 outline-none w-ful rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="email" placeholder='Email' />
      </div>
      <div className="grid grid-cols-1 lg:grids-cols-2 gap-4 mb-4">
        <div>
    <input ref={storeDataEl} type='checkbox' className="cursor-pointer" id="storedata" name="storeData" />
    <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save email and name for next time I comment</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required!</p>}
      <div className="mt-8">
        <buttn type="button" onClick={handleCommentSubmission} className="bg-blue-600 hover:bg-[#F34807] transition duration-500 ease  inline-block  text-lg rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</buttn>
        {showSuccessMessage && <span className="text-md text-center font-semibold mt-3 text-green-500">Successfully posted a comment!</span>}
        </div>
    </div>
  )
}

export default CommentForm