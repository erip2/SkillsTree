import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import {useHistory} from "react-router-dom";

import { userLoggedIn } from '../redux/actions/userActions';
import { auth } from '../services/firebase';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import SignInSchema from '../validations/SignInSchema';
import validationMessage from '../helpers/validationMessage';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        SkillsTree
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
    const classes = useStyles();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [loading, setLoading] = useState(false);

    const [apiErrors, setApiErrors] = useState(null);

    const {register, handleSubmit, errors} = useForm({
      validationSchema: SignInSchema
    });

    const dispatch = useDispatch();

    const history = useHistory();

    const onSubmit = () => {
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password)
            .then((data) => {
              dispatch(userLoggedIn(data));
              history.push('/test');
            })
            .catch(error => {
                setApiErrors(error);
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
  
    // useEffect(() => {
    //   const unsubscribe = onAuthStateChange(setUser);
    //   return () => {
    //     unsubscribe();
    //   };
    // }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            name="TextField"
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            error={ validationMessage('email', errors) ? true : false }
            helperText={validationMessage('email', errors)}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            name="TextField"
            variant="outlined"
            margin="normal"
            required
            inputRef={register}
            fullWidth
            error={ validationMessage('email', errors) ? true : false }
            helperText={ validationMessage('password', errors) }
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          { apiErrors && <Alert severity="error">{apiErrors.message}</Alert> }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            { loading ? <CircularProgress color="inherit" /> : 'Sign in' }
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}