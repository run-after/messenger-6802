import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
const CHAT_BUBBLE_URL = 'https://res.cloudinary.com/chaaase/image/upload/v1632243192/bubble_udo16y.svg';
const BG_IMG_URL = 'https://res.cloudinary.com/chaaase/image/upload/v1632243379/bg-img_vgk1pi.png';

const useStyles = makeStyles((theme) => ({
  aside: {
    height: '100vh',
    background:
      `linear-gradient(0deg, rgba(134,185,255,1) 0%, rgba(58,141,255,0.85) 100%), top / contain no-repeat url(${BG_IMG_URL})`,
    backgroundSize: 'cover',
    color: 'white',
    textAlign: 'center',
    [theme.breakpoints.down(600)]: {
      height: '100%',
      padding: '20px'
    }
  },
  asideImg: {
    height: '100px',
    width: '100px',
    [theme.breakpoints.down(600)]: {
      height: '50px',
      width: '50px'
    }
  },
  asideText: {
    margin: '35px 45px 0 45px',
    [theme.breakpoints.down(600)]: {
      marginTop: '10px'
    }
  },
  registerText: {
    opacity: '0.5',
    margin: '10px 20px'
  },
  registerBtn: {
    color: '#3A8DFF',
    boxShadow: '0px 0px 10px lightgray',
    margin: '10px 50px 10px 20px',
    height: '50px',
    padding: '20px 40px',
    fontFamily: 'Montserrat, sans-serif'
  },
  formContainer: {
    height: '75%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginBtn: {
    background: '#3A8DFF',
    color: 'white',
    margin: '20px',
    padding: '10px 50px',
    '&:hover': {
      background: '#003b75'
    },
    fontFamily: 'Montserrat, sans-serif'
  }
  }));

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
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
      {/* ASIDE */}
      <Grid
        container
        item
        xs={12}
        sm={4}
        className={classes.aside}
        justifyContent='center'
        alignItems='center'
        direction='column'
      >
        <img src={CHAT_BUBBLE_URL} alt='chat-bubble' className={classes.asideImg}/>
        <Typography className={classes.asideText} variant='h5'>
          Converse with anyone with any language
        </Typography>
      </Grid>
      {/* MAIN */}
      <Grid container item xs={12} sm={8}>
        {/* TOP REGISTER SECTION */}
        <Grid container item justifyContent='flex-end' alignItems='center'>
          <Typography className={classes.registerText} variant='body2'>Need to register?</Typography>
          <Button className={classes.registerBtn} onClick={() => history.push("/register")}>Register</Button>
        </Grid>
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
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Button type="submit" variant="contained" size="large" className={classes.loginBtn}>
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
