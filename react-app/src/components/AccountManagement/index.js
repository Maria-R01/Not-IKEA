import React, { useState, useEffect } from 'react';
import './AccountManagement.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/session';


function AccountManagement() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        // Call your API endpoint to update the user
        dispatch(updateUserProfile(editedUser));
        console.log('EDITED USER: ', editedUser)
        // Disable edit mode after saving
        setEditMode(false);
    };

    const handleCancelClick = () => {
        // Reset edited user and disable edit mode
        setEditedUser({ ...user });
        setEditMode(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    useEffect(() => {
        setEditedUser({ ...user });
      }, [user]);
    

    return (
        <div className='account-overall-container'>
            <h1>My Account</h1>
            <p>Manage your account information. Here you can edit your email, username and password.</p>
            <div className='label-container'>
                <label>Email:</label>
                {editMode ? (
                    <input
                        type="text"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{user.email}</span>
                )}
            </div>
            <div className='label-container'>
                <label>Username:</label>
                {editMode ? (
                    <input
                        type="text"
                        name="username"
                        value={editedUser.username}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{user.username}</span>
                )}
            </div>
            {editMode && (
                <div className='label-container'>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={editedUser.password}
                        onChange={handleInputChange}
                    />
                </div>
            )}
            <div>
                {editMode ? (
                    <div className='edit-mode-buttons-container'>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <div className='not-edit-mode-buttons-container'>
                        <button onClick={handleEditClick}>Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountManagement;
