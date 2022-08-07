import React from 'react'
import PropTypes from 'prop-types'

import UserList from './UserList'
import IconChat from './icons/IconChat';

const Nav = ({ account, contacts, onClick, onGoDashboard }) => {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <NavTitle
        title="QuickChat"
        onClick={onGoDashboard}
      />
      <div className="flex flex-col mt-8">
        <UserList
          account={account}
          title="Active Conversations"
          users={contacts}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

Nav.propTypes = {
  account: PropTypes.object.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onGoDashboard: PropTypes.func,
}

const NavTitle = ({ title, onClick }) => {
  return (
    <div 
      className="flex flex-row items-center justify-center h-12 w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
        <IconChat />
      </div>
      <div className="ml-2 font-bold text-2xl">
        { title }
      </div>
    </div>
  );
}

NavTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Nav