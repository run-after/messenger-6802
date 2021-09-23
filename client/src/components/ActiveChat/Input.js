import React, { useState, useRef } from "react";
import { FormControl, FilledInput, Grid, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

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
  },
  imgPreview: {
    background: '#F4F6FA',
    padding: '10px 10px 0 10px',
    borderRadius: '8px 8px 0 0'
  },
  imgContainer: {
    position: 'relative',
    display: 'inline-block',
    padding: '25px 10px 0 0'
  },
  removeImgBtn: {
    position: 'absolute',
    top: '0',
    right: '0',
    background: 'none',
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.5'
    }
  },
  img: {
    height: '100px',
    borderRadius: 5,
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

    const urls = await uploadImages();

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.   
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: urls
    };
    await postMessage(reqBody);
    setText("");
    setFiles([]);
    setFilesPreview([]);
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
  };

  const uploadImages = async () => {
    const urls = await (Promise.all(files.map(async file => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'chaaase');
      data.append('cloud_name', 'chaaase');
      const url = await fetch('https://api.cloudinary.com/v1_1/chaaase/image/upload', {
        method: 'POST',
        body: data
      }).then(res => res.json().then(data => data.url));
      return url;
    })));
    return urls;
  };

  const removeImg = (index) => {
    const tempFilesPreview = [...filesPreview];
    const tempFiles = [...files];
    tempFilesPreview.splice(index, 1);
    tempFiles.splice(index, 1);
    setFilesPreview(tempFilesPreview);
    setFiles(tempFiles);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        {
          filesPreview.length > 0 &&
          <Grid className={classes.imgPreview}>
            {
              filesPreview.map((file, index) => (
                <Box key={file} className={classes.imgContainer}>
                  <button type='button' className={classes.removeImgBtn} onClick={() => removeImg(index)}><DeleteForeverOutlinedIcon /></button>
                  <img src={file} alt={file.name} className={classes.img} />
                </Box>
              ))
            }
          </Grid>
        }
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