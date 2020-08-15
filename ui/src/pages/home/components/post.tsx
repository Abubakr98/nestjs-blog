import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IPost } from '../../../interfaces';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    marginBottom: 20,
    padding: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    paddingLeft: '50px',
  },
});

type PostProps = {
  post: IPost;
};

export const Post: React.FC<PostProps> = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id, text, user } = post;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2" component="p">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={() => history.push(`/posts/${id}`)}>
          Read
        </Button>
        <Typography className={classes.pos} color="textSecondary">
          {user?.name}
        </Typography>
      </CardActions>
    </Card>
  );
};
