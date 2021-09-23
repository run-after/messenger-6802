import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  authText: {
    opacity: '0.5',
    margin: '10px 20px'
  },
  authBtn: {
    color: '#3A8DFF',
    boxShadow: '0px 0px 10px lightgray',
    margin: theme.spacing(1, 5, 1, 2),
    height: '50px',
    width: 150
  }
}));

const LinkToAuthSection = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { path } = props;

  const prefix = path === 'register' ? "Don't" : "Already";
  const buttonText = path === 'login' ? 'Login' : 'Create account';

  return (
    <Grid container item justifyContent='flex-end' alignItems='center'>
      <Typography className={classes.authText} variant='body2'>{prefix} have an account?</Typography>
      <Button className={classes.authBtn} onClick={() => history.push(`/${path}`)}>{buttonText}</Button>
    </Grid>
  );
};

export default LinkToAuthSection;