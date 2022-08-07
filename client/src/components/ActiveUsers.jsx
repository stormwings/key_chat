import React from "react";
import PropTypes from "prop-types";

const ActiveUsers = ({ contacts, users, onSelect }) => {
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <TableHeader />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      users.map((user, index) => {
                        const { _id, name } = user;
                        const selectUser = () => onSelect(user._id);
                        
                        const existChat = contacts.find(chat => chat.users[0]._id === _id || chat.users[1]._id === _id)

                        if (existChat) {
                          return null
                        }

                        return (
                          <TableRow
                            key={index}
                            name={name}
                            onSelect={selectUser}
                          />
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ActiveUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const TableRow = ({ name, onSelect }) => {
  const firstLetter = name.substring(0, 1);

  return (
    <tr
      className="cursor-pointer"
      onClick={onSelect}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              { firstLetter }
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              { name }
            </div>
            <div className="text-sm text-gray-500">
              email@example.com
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          Profession
        </div>
        <div className="text-sm text-gray-500">
          Senior
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div
          className="text-indigo-600 hover:text-indigo-900"
        >
          Block
        </div>
      </td>
    </tr>
  )
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
}

const TableHeader = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Name
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Profile
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Status
        </th>
        <th scope="col" className="relative px-6 py-3">
          <span className="sr-only">Action</span>
        </th>
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {

}

export default ActiveUsers;
