import React from 'react';
import Typography from '@material-ui/core/Typography';
import { IPost } from '../../../interfaces';
import styled from 'styled-components';
import { Paper, IconButton, Button } from '@material-ui/core';
import { DELETE_POST } from '../../../utils/queries';
import { useMutation } from '@apollo/client';
import { CommentModal } from '../../comment/CreateComment';

const MyPaper = styled(Paper)`
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
  h4 {
    margin-bottom: 40px;
    font-weight: bold;
  }
`;

const Comments = styled.div``;

type PostProps = {
  post: IPost;
};

export const PostText: React.FC<PostProps> = ({ post, children }) => {
  const { id, text, user } = post;
  const [deletePost, { data }] = useMutation(DELETE_POST);
  const [open, setOpen] = React.useState(false);

  const onDelete = () => {
    deletePost({ variables: { id } });
  };
  if (data) {
    window.location.href = '/';
  }

  return (
    <>
      <MyPaper elevation={3}>
        <div style={{ textAlign: 'right' }}>
          <IconButton aria-label="close" onClick={onDelete} color="secondary">
            &#10005;
          </IconButton>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            {user?.name}
          </Typography>
        </div>
        <Typography variant="body1" component="p" color="textPrimary">
          {text}
        </Typography>
        <div style={{ textAlign: 'right', paddingBottom: '20px' }}>
          <Button size="small" variant="outlined" color="primary" onClick={() => setOpen(true)}>
            create comment
          </Button>
        </div>

        <CommentModal setOpen={setOpen} open={open} />
      </MyPaper>
      <MyPaper style={{ marginTop: '20px' }} elevation={1}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4" color="textPrimary">
            Comments
          </Typography>
        </div>
        <Comments>{children}</Comments>
      </MyPaper>
    </>
  );
};
