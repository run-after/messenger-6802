import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme, props) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    alignItems: (props) => props.otherUser ? 'flex-start' : 'flex-end'
  },
  header: {
    display: 'flex'
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: theme.spacing(1)
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: props => props.otherUser ? 'flex-start' : 'flex-end'
  },
  otherBubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  senderBubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: -0.2,
    padding: theme.spacing(1),
    color: (props) => props.otherUser ? '#FFFFFF' : '#91A3C0'
  },
  imgContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: props => props.otherUser ? 'flex-start' : 'flex-end',
    marginLeft: props => props.otherUser ? theme.spacing(5) : ''
  },
  img: {
    height: '100px',
    margin: '0 3px',
    borderRadius: (props) => props.otherUser ? '5px 5px 5px 0' : '5px 5px 0 5px'
  },
  multiImgs: {
    height: '75px',
    margin: '0 3px',
    borderRadius: props => props.otherUser ? '5px 5px 5px 0' : '5px 5px 0 5px'
  }
}));

const Bubble = (props) => {
  const classes = useStyles(props);
  const { text, time, otherUser, attachments } = props;
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {
          otherUser &&
          <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
        }
        <Typography className={classes.date}>
          {otherUser && otherUser.username} {time}
        </Typography>
      </Box>
      <Box className={classes.body}>
        {
          text &&
          <Box className={otherUser ? classes.otherBubble : classes.senderBubble}>
            <Typography className={classes.text}>{text}</Typography>            
          </Box>
        }
        {
          attachments &&
          <Box className={classes.imgContainer}>
            {attachments.map(attachment => (
              <img key={attachment} src={attachment} alt={attachment} className={attachments.length > 1 ? classes.multiImgs : classes.img} />
            ))}
          </Box>
        }
      </Box>
    </Box>
  );
};

export default Bubble;