import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const orderedMessages = messages.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  });

  return (
    <Box>
      {orderedMessages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  const currentConvoMessages = [...state.conversations.find((conversation) => conversation.otherUser.username === state.activeConversation).messages]
  return {
    messages: currentConvoMessages
  };
};

export default connect(mapStateToProps, null)(Messages);