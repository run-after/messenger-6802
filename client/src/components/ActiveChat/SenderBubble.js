import React from "react";
import Bubble from './Bubble';

const SenderBubble = (props) => {

  const { time, text, attachments } = props;
  return (
    <Bubble time={time} text={text} attachments={attachments} />
  );
};

export default SenderBubble;