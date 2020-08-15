import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { IPost, IComment } from '../../interfaces';
import { useQuery } from '@apollo/client';
import { POST } from '../../utils/queries';
import { PostText } from './components/post';
import { Comment } from './components/comment';

const MyPaper = styled(Paper)`
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
  h4 {
    margin-bottom: 40px;
    font-weight: bold;
  }
`;

export const Post: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(POST, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error?.message} :</p>;
  const post = data.post;
  const comments = data.post.comments;

  return (
    <div>
      <PostText post={post} />
      {comments &&
        comments.map((el: IComment) => {
          return <Comment comment={el} />;
        })}
    </div>
  );
};
