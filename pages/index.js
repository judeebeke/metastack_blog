import Head from 'next/head';
import {getPosts} from '@/services';
import FeaturedPosts from '@/components/FeaturedPosts';
import PostCard from '@/components/PostCard';
import PostWidgets from '@/components/PostWidgets';
import Category from '@/components/Category';

export default function Home({posts}) {
  return (
    <main className={`container mx-auto px-10 font-medium text-white`}>
      <Head>
        <title>METASTACK | The Blog!</title>
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-4">
          {posts.map ((post, index) => {
            return <PostCard key={post.node.title} post={post.node} />;
          })}
        </div>
        <aside className="col-span-4 lg:col-span-4">
          <div className="relative lg:sticky top-8 gap-y-0 lg:gap-y-8">
            <PostWidgets />
            <Category />
          </div>
        </aside>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const posts = (await getPosts ()) || [];
  return {
    props: {
      posts: posts.postsConnection.edges,
    },
  };
};
