import {request, gql} from 'graphql-request';

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query Assets {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featureImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
      `;

  try {
    const result = await request (graphqlApi, query);
    return result;
  } catch (error) {
    console.error ('Error fetching data:', error);
    throw error;
  }
};

export const getRecentPost = async () => {
  const query = gql`
  query RecentPostQuery {
    posts(orderBy: createdAt_DESC, last: 3) {
      title
      createdAt
      slug
      featureImage {
        url
      }
    }
  }  
    `;

  try {
    const result = await request (graphqlApi, query);
    return result;
  } catch (error) {
    console.error ('Error fetching data:', error);
    throw error;
  }
};

export const getSimilarPost = async ({ categories, slug }) => {

  const query = gql`
    query RecentPostQuery($categories: [String], $slug: String) {
      posts(last: 3, where: { slug_not: $slug, AND: {categories_some: {slug_in: $categories } } }) {
        title
        createdAt
        slug
        featureImage {
          url
        }
      }
    }
  `;

  try {
    const result = await request(graphqlApi, query, { categories, slug });
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const getCategories = async () => {
  const query = gql`
    query GetCategoriesQuery {
      categories {
        name
        slug
      }
    }
    
      `;

  try {
    const result = await request (graphqlApi, query);
    return result;
  } catch (error) {
    console.error ('Error fetching data:', error);
    throw error;
  }
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String) {
      post(where: {slug: $slug}){
        author {
          bio
          name
          photo {
            url
          }
        }
        id
        excerpt
        createdAt
        slug
        title
        featureImage {
          url
        }
        content {
          raw
        }
        categories {
          slug
          name
        }
      }
    }
      `;

  try {
    const result = await request (graphqlApi, query, {slug});
    return result.post;
  } catch (error) {
    console.error ('Error fetching data:', error);
    throw error;
  }
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj),
  })

  return result.json();
}

export const getComments = async ({ slug }) => {
  const query = gql`
    query GetCategoriesQuery($slug: String!) {
      comments(where: {post: {slug: $slug }}) {
        name
        createdAt
        comment
      }
    }
    
      `;

  try {
    const result = await request (graphqlApi, query, {slug});
    return result;
  } catch (error) {
    console.error ('Error fetching data:', error);
    throw error;
  }
};


export const getFeaturedPosts = async () => {
  const query = gql`
  query GetFeaturedPosts {
    posts(where: {featuredPost: true}) {
      id
      slug
      title
      featureImage {
        url
      }
      author {
        name
        photo {
          url
        }
      }
    }
  }`

  try {
    const result = await request (graphqlApi, query);
    return result;
  } catch (error) {
    console.error ('Error fetching data:', error);
    throw error;
  }
};


export const getCategoriesPosts = async ({slug}) => {
  const query = gql`
  query GetCategoriesPosts($slug: String!) {
    categories(where: {slug: $slug}) {
      posts {
        excerpt
        createdAt
        slug
        title
        id
        featureImage {
          url
        }
        author {
          name
          photo {
            url
          }
        }
      }
    }
  }
  
  `

  try {
    const result = await request (graphqlApi, query, {slug});
    return result;
  } catch (error) {
    console.error ('Error fetching data:', error);
    throw error;
  }
};