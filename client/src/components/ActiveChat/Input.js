import React, { useState, useRef } from "react";
import { FormControl, FilledInput, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: '8px 0 0 8px',
    marginBottom: 20,
    width: '100%'
  },
  imageBtn: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: '0 8px 8px 0',
    marginBottom: 20,
    '&:hover': {
      background: '#bdbdbd'
    }
  }
}));

const Input = (props) => {

  const fileInput = useRef(null);
  const textInput = useRef(null);

  const classes = useStyles();
  const [text, setText] = useState("");
  const [filesPreview, setFilesPreview] = useState([]);
  const [files, setFiles] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user
    };
    await postMessage(reqBody);
    setText("");
  };

  const handleAttach = (e) => {
    // This is the preview images
    const tempPreview = [...filesPreview];
    tempPreview.push(URL.createObjectURL(e.target.files[0]));
    setFilesPreview(tempPreview);

    // Actual files to upload
    const tempFiles = [...files];
    tempFiles.push(e.target.files[0]);
    setFiles(tempFiles);
    textInput.current.click();

    console.log('files', files)
    console.log('filesPreview', filesPreview);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <Grid container justifyContent='center'>
          <Grid item xs={11}>
            <FilledInput
              classes={{ root: classes.input }}
              disableUnderline
              placeholder="Type something..."
              value={text}
              name="text"
              onChange={handleChange}
              ref={textInput}
            />
          </Grid>
          <Grid item xs={1}>
            <input type='file' name='image' ref={fileInput} onChange={handleAttach} hidden />
            <Button onClick={()=>fileInput.current.click()}className={classes.imageBtn}>
              <FilterNoneOutlinedIcon color='disabled' />
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
