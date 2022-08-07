import React from "react";
import PropTypes from "prop-types";

const UserList = ({ account, title, users, onClick }) => {
  return (
    <React.Fragment>
      <UserListTitle
        cuantity={users.length || 0}
        title={title}
      />
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-96 overflow-y-auto">
        {users.map((user, index) => {
          const receiver = user.users[1]._id === account._id ? user.users[0] : user.users[1];

          return (
            <UserListItem
              // (pending) generate color by name
              color={'indigo'}
              key={index}
              name={receiver.name}
              onClick={() => onClick(user._id)}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

UserList.propTypes = {
  account: PropTypes.object,
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func,
};

const UserListTitle = ({ cuantity, title }) => {
  return (
    <div className="flex flex-row items-center justify-between text-xs">
      <span className="font-bold">
        { title }
      </span>
      {cuantity && (
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          { cuantity }
        </span>
      )}
    </div>
  );
};

UserListTitle.propTypes = {
  cuantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const UserListItem = ({ color, name, onClick }) => {
  return (
    <button
      className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
      onClick={onClick}
    >
      <div className={`flex items-center justify-center h-8 w-8 bg-${color}-200 rounded-full`}>
        { name && name.charAt(0).toUpperCase() }
      </div>
      <div className="ml-2 text-sm font-semibold">{ name }</div>
    </button>
  );
};

UserListItem.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default UserList;