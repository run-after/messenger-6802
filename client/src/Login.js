import React from "react";
import { Grid } from "@material-ui/core";
import Aside from './components/Aside';
import LinkToAuthSection from './components/LinkToAuthSection';
import AuthForm from "./components/AuthForm";

const Login = (props) => {

  return (
    <Grid container>
      <Aside />
      <Grid container item xs={12} sm={8}>
        <LinkToAuthSection path='register' />
        <AuthForm formType='login' />
      </Grid>
    </Grid>
  );
};

export default Login;