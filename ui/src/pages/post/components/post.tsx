import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IPost } from '../../../interfaces';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const MyPaper = styled(Paper)`
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
  h4 {
    margin-bottom: 40px;
    font-weight: bold;
  }
`;

type PostProps = {
  post: IPost;
};

export const PostText: React.FC<PostProps> = ({ post }) => {
  const { text, user } = post;

  return (
    <MyPaper elevation={3}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          {user?.name}
        </Typography>
      </div>
      <Typography variant="body1" component="p" color="textPrimary">
        {text}
      </Typography>
    </MyPaper>
  );
};
