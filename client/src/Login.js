import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
  TextField
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import Aside from './components/Aside';
import LinkToAuthSection from './components/LinkToAuthSection';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: '75%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginBtn: {
    margin: theme.spacing(3),
    padding: theme.spacing(1, 5)
  }
  }));

const Login = (props) => {
  const classes = useStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <Aside />
      {/* MAIN */}
      <Grid container item xs={12} sm={8}>

        <LinkToAuthSection path='register' />

        {/* FORM SECTION */}
        <Grid
          container
          justifyContent='center'
          alignContent='center'
          className={classes.formContainer}
        >
           <form onSubmit={handleLogin} className={classes.form}>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
              <FormControl margin="normal" required>
                <TextField
                  label="Password"
                  aria-label="Password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Button color='primary' type="submit" variant="contained" size="large" className={classes.loginBtn}>
                Login
              </Button>
            </form>
          </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
