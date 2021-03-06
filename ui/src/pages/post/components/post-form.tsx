import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { CREATE_POST } from '../../../utils/queries';
import { MyPaper, Form } from './styles';

export const PostForm: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>('');
  const [formError, setError] = useState<boolean>(false);
  const [createPost, { data, error }] = useMutation(CREATE_POST);

  const onCreate = () => {
    if (!text) {
      setError(true);
      return;
    }
    setError(false);
    setText('');
    const input = { input: { text } };
    createPost({ variables: input });
  };
  if (data) {
    window.location.href = `/posts/${data.createPost.id}`;
  }
  if (error) {
    alert(JSON.stringify(error.message, null, 2));
  }
  return (
    <MyPaper elevation={3}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5" color="textPrimary">
          Create post
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
