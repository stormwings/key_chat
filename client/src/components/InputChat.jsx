import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";

import IconAttach from './icons/IconAttach';
import IconSend from './icons/IconSend';

const InputChat = ({ onSendMessage }) => {
  const { reset: resetForm, register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    const { message } = formData;
    onSendMessage(message);
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div>
          <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
            <IconAttach />
          </button>
        </div>
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              {...register('message')}
              type="text"
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              placeholder="Type your message here..."
            />
          </div>
        </div>
        <div className="ml-4">
          <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
            <span>Send</span>
            <span className="ml-2">
              <IconSend />
            </span>
          </button>
        </div>
      </div>
    </form>
  )
}

InputChat.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
}

export default InputChat;