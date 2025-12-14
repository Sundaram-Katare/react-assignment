import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAsync } from './features/users/usersSlice';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import EditUserModal from './components/EditUserModal';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>User Management Dashboard</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add New User'}
          </button>
        </header>

        {showForm && (
          <UserForm onClose={() => setShowForm(false)} />
        )}

        <UserTable onEdit={setEditingUser} />

        {editingUser && (
          <EditUserModal 
            user={editingUser}
            onClose={() => setEditingUser(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
