import React from "react";
import Bubble from './Bubble';

const OtherUserBubble = (props) => {
  
  const { text, time, otherUser, attachments } = props;
  return (
    <Bubble text={text} time={time} otherUser={otherUser} attachments={attachments} />
  );
};

export default OtherUserBubble;
