import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/users/usersSlice';

const EditUserModal = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    website: user.website || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit User</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
            />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              Update User
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
    </div>
  );
};

export default EditUserModal;
