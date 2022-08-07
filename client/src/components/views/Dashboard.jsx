import React from "react";
import { Redirect } from 'react-router-dom';

import Chat from "./../Chat";
import Nav from "./../Nav";
import ActiveUsers from "./../ActiveUsers";
import { useUsersReducer } from "./../../redux/actions/userActions";
import { useChatsReducer } from "./../../redux/actions/chatActions";
import { useMessagesReducer } from "./../../redux/actions/messageActions";

const App = () => {
  const {
    accountReducer: { account },
    usersReducer,
    usersActions
  } = useUsersReducer();

  const { chatsReducer, chatsActions } = useChatsReducer();
  const { messagesReducer, messagesActions } = useMessagesReducer();

  React.useEffect(() => {
    usersActions.getUsers();
    // pending make wrapper
    if (account)
      chatsActions.getChats(account._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!account) {
    return <Redirect to={'/login'} />;
  }

  const onRequestChat = (userId) => {
    const activeChat = chatsReducer.chats.find((chat) => {
      if (!chat.users)
        return false;

      return (chat.users[1]._id === userId) || (chat.users[0]._id === userId);
    });

    if (!activeChat) {
      chatsActions.addChat(account._id, userId);
      onOpenChat(userId);
    } else {
      onOpenChat(userId);
    }
  }

  const onOpenChat = (chatId) => {
    chatsActions.setChat(chatId);
    messagesActions.getMessages(chatId);
  };

  const onSendMessage = (message) => {
    const { selectedChat } = chatsReducer;
    const { _id: userId } = account;

    messagesActions.addMessage(selectedChat, message, userId);
  };

  const onGoBackToMenu = () => {
    chatsActions.unsetChat();
  }

  const users = usersReducer.users.filter(user => user._id !== account._id);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Nav
          account={account}
          contacts={chatsReducer.chats}
          onClick={onOpenChat}
          onGoDashboard={onGoBackToMenu}
        />
        {
          messagesReducer.loading &&
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  {"Loading"}
                </div>
              </div>
            </div>
        }
        {
          chatsReducer.selectedChat &&
          !messagesReducer.loading &&
            <Chat
              messages={messagesReducer.messages}
              user={account}
              onGoBack={onGoBackToMenu}
              onSendMessage={onSendMessage}
            />
        }
        {
          !chatsReducer.selectedChat &&
            <ActiveUsers
              users={users}
              contacts={chatsReducer.chats}
              onSelect={onRequestChat}
            />
        }
      </div>
    </div>
  );
};

export default App;