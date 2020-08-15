import React, { useState } from 'react';
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
      {posts.map((el: IPost) => {
        return <Post post={el} />;
      })}
    </React.Fragment>
  );
};
