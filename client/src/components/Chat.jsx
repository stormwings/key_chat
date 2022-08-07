import React from 'react'
import PropTypes from 'prop-types'

import InputChat from './InputChat';

const Chat = ({ user, messages, onSendMessage, onGoBack }) => {
  const { _id: myUserId } = user;

  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div
        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
        onClick={onGoBack}
      >
        {"< Go back"}
      </div>
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {
                messages.map((message, index) => {
                  const MessageComponent = message.user._id === myUserId
                    ? MessageSent
                    : MessageReceived

                    return (
                      <MessageComponent
                        key={index}
                        message={message.message}
                      />
                    )
                })
              }
            </div>
          </div>
        </div>
        <InputChat
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
}

Chat.propTypes = {
  user: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSendMessage: PropTypes.func,
  onGoBack: PropTypes.func,
}

const MessageReceived = ({ message }) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          B
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{ message }</div>
        </div>
      </div>
    </div>
  )
}

MessageReceived.propTypes = {
  message: PropTypes.string.isRequired,
}

const MessageSent = ({ message }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>
            { message }
          </div>
        </div>
      </div>
    </div>
  )
}
MessageSent.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Chat