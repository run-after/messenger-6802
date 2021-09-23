import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "../store/utils/thunkCreators";
import { login } from "../store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: '75%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  createBtn: {
    margin: theme.spacing(3),
    padding: theme.spacing(1, 5)
  }
  }));

const AuthForm = (props) => {

  const classes = useStyles();
  const { user, login, register, formType } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  console.log(formType);

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

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
    <Grid
      container
      justifyContent='center'
      alignContent='center'
      className={classes.formContainer}
    >
      <form onSubmit={formType === 'signup' ? handleRegister : handleLogin} className={classes.form}>
        <FormControl margin="normal" required>
          <TextField
            aria-label="username"
            label="Username"
            name="username"
            type="text"
            required
          />
        </FormControl>
        {
          props.formType === 'signup' &&
          <FormControl margin="normal" required>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              required
            />
          </FormControl>
        }
        <FormControl margin="normal" error={!!formErrorMessage.confirmPassword}>
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="password"
              required
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
        </FormControl>
        {
          props.formType === 'signup' &&
          <FormControl margin="normal" error={!!formErrorMessage.confirmPassword}>
            <TextField
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              required
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
        }
          <Button color='primary' type="submit" variant="contained" size="large" className={classes.formBtn}>
          {formType === 'signup' ? 'Create' : 'Login'}
          </Button>
        </form>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);