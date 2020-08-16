import React from 'react';
import { useQuery } from '@apollo/client';
import { POSTS } from '../../utils/queries';
import { Post } from './components/post';
import { IPost } from '../../interfaces';

export const Home: React.FC = () => {
  const { loading, error, data } = useQuery(POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error?.message} :</p>;
  const posts = data.posts;

  return (
    <React.Fragment>
      {posts.length
        ? posts.map((el: IPost) => {
            return <Post key={el.id} post={el} />;
          })
        : 'No posts yet :('}
    </React.Fragment>
  );
};
