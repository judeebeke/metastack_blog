import React from 'react';
import { getPostDetails, getPosts } from '@/services';
import PostDetail from '@/components/PostDetail';
import Author from '@/components/Author';
import CommentForm from '@/components/CommentForm';
import Comments from '@/components/Comments';
import PostWidgets from '@/components/PostWidgets';
import Category from '@/components/Category';

const PostDetails = (posts) => {
   
  return (
    <div className="container mx-auto px-10 mb-8"
    >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                <PostDetail post={posts.posts} />
                <Author author={posts.posts.author} />
                <CommentForm slug={posts.posts.slug}  />
                <Comments slug={posts.posts.slug} />
            </div>
            <div className="col-span-1 lg:col-span-4">
                <div className="relative lg:sticky top-8">
                    <PostWidgets slug={posts.posts.slug} categories={posts.posts.categories.map((category) => category.slug)} />
                    <Category />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails;

export const getStaticProps = async ({params}) => {
  const data = (await getPostDetails(params.slug)) || []; 

   return {
   props: {
    posts: data,
     },
   }
  }

  export const getStaticPaths = async () => {
    const posts = await getPosts();
    
    return {
        paths: posts.postsConnection.edges.map(({node: {slug}}) => ({params: {slug}})),
        fallback: false,
    }
  }