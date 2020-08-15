import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { signup } from '../../../../utils/queries';
import { MyPaper, Form } from './styles';
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
export const SignUpForm: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [pass2, setPass2] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const onCreate = () => {
    if (!email || !name || !pass || !pass2) {
      setError(true);
      return;
    }
    if (pass !== pass2 && !/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(pass)) {
      setError(true);
      return;
    }
    setError(false);
    setEmail('');
    setPass('');
    setPass2('');
    setName('');
    const data = signup({
      name,
      email,
      password: pass,
    });
    data
      .then((json) => {
        setOpen(true);
        window.location.href = '/signin';
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data.message, null, 2));
      });
  };
  return (
    <MyPaper elevation={3}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5" color="textPrimary">
          Sign Up and crete your first post
        </Typography>
      </div>
      <Form>
        <TextField
          inputRef={ref}
          label="Your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          error={error}
          helperText={error && 'required'}
        />
        <TextField
          label="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={error}
          helperText={error && 'required'}
        />
        <TextField
          label="password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          error={error}
          helperText={error && 'password must be at least 8 characters long and have an uppercase letter and a number'}
        />
        <TextField
          label="password"
          onChange={(e) => setPass2(e.target.value)}
          value={pass2}
          error={error}
          helperText={error && 'password must be at least 8 characters long and have an uppercase letter and a number'}
        />
        <div>
          <Button variant="contained" color="primary" style={{ margin: '0 auto', display: 'block' }} onClick={onCreate}>
            sign up
          </Button>
        </div>
      </Form>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Success
        </Alert>
      </Snackbar>
    </MyPaper>
  );
};
