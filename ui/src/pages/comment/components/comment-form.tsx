import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';

import { CREATE_COMMENT } from '../../../utils/queries';
import { MyPaper, Form } from './styles';

export const CommentForm: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>('');
  const [formError, setError] = useState<boolean>(false);
  const [createPost, { data, error }] = useMutation(CREATE_COMMENT);
  const { id } = useParams();

  const onCreate = () => {
    if (!text) {
      setError(true);
      return;
    }
    const input = { input: { text, postId: id } };
    createPost({ variables: input });
    setError(false);
    setText('');
  };
  if (data) {
    window.location.reload();
  }
  if (error) {
    alert(JSON.stringify(error.message, null, 2));
  }
  return (
    <MyPaper elevation={3}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5" color="textPrimary">
          Create comment
        </Typography>
      </div>
      <Form>
        <TextField
          inputRef={ref}
          multiline
          label="Your text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          error={formError}
          helperText={formError && 'required'}
        />
        <div>
          <Button variant="contained" color="primary" style={{ margin: '0 auto', display: 'block' }} onClick={onCreate}>
            create
          </Button>
        </div>
      </Form>
    </MyPaper>
  );
};
