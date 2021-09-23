import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography
} from "@material-ui/core";
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
  }
}));

const Aside = (props) => {
  const classes = useStyles();

  return (
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
  );
};

export default Aside;