import React from 'react';
import { useParams } from 'react-router';
import { IComment } from '../../interfaces';
import { useQuery } from '@apollo/client';
import { POST } from '../../utils/queries';
import { PostText } from './components/post';
import { Comment } from '../comment/components/comment';

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
      <PostText post={post}>
        <>
          {comments &&
            comments.map((el: IComment) => {
              return <Comment key={el.id} comment={el} />;
            })}
        </>
      </PostText>
    </div>
  );
};
