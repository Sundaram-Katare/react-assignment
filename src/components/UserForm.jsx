import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/users/usersSlice';

const UserForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      dispatch(addUser(formData));
      setFormData({ name: '', email: '', phone: '', website: '' });
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="user-form">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter name"
          />
        </div>
        
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />
        </div>
        
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone"
          />
        </div>
        
        <div className="form-group">
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            Create User
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
