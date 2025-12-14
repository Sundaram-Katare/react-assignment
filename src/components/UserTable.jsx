import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../features/users/usersSlice';

const UserTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || 'N/A'}</td>
                <td>{user.website || 'N/A'}</td>
                <td>
                  <button 
                    className="btn btn-edit"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
