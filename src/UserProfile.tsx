import React, { useState } from 'react';
import './UserProfile.css';
import Navbar from './components/navbar/Navbar';
import saveIcon from './assets/save-icon.png';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false); // State to track if in edit mode
  const [preferredName, setPreferredName] = useState('');
  const [school, setSchool] = useState('');
  const [committees, setCommittees] = useState<string[]>([]);
  const [serviceStatement, setServiceStatement] = useState('');

  const committeeOptions = [
    { value: 'COM1', label: 'COM1' },
    { value: 'COM2', label: 'COM2' },
    { value: 'COM3', label: 'COM3' },
  ];

  const schoolOptions = [
    { value: 'School of Business', label: 'School of Business' },
    { value: 'School of Science', label: 'School of Science' },
    { value: 'School of Liberal Arts', label: 'School of Liberal Arts' },
  ];

  const handleCommitteeChange = (selectedOptions: any) => {
    setCommittees(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  const handleSave = () => {
    setIsEditing(false);
    // You can also trigger a save to the database here
  };

  return (
    <div className='container'>
      <Navbar />
      <h1 className='title'>Your Election Profile</h1>
      <div className="profile-form-container">
        {isEditing ? (
          // Edit State
          <form className="profile-form">
            <div className="form-group">
              <label>Enter your preferred name (how it will appear on the ballot)</label>
              <input
                type="text"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
                placeholder="Your Preferred Name Here"
              />
            </div>
            <div className="form-group">
              <label>Select your School from the dropdown menu</label>
              <Select
                options={schoolOptions}
                value={schoolOptions.find(option => option.value === school)}
                onChange={(selectedOption) => setSchool(selectedOption?.value || '')}
                placeholder="Select School"
              />
            </div>
            <div className="form-group">
              <label>Select the committees you have been a part of (can select multiple)</label>
              <CreatableSelect
                className='select-input'
                isMulti
                options={committeeOptions}
                onChange={handleCommitteeChange}
                placeholder="Select or input committees"
              />
            </div>
            <div className="form-group">
              <label>Create a Service Statement (Why someone should vote for you)</label>
              <textarea
                value={serviceStatement}
                onChange={(e) => setServiceStatement(e.target.value)}
                placeholder="Enter your statement here"
                maxLength={300}
              />
              <small>{serviceStatement.length}/300</small>
            </div>
            <div className="form-group">
              <button type="button" className="save-button" onClick={handleSave}>
                <p>Save Profile</p>
                {/* <img src={saveIcon} alt="Save" /> */}
              </button>
            </div>
          </form>
        ) : (
          // View State
          <div className="profile-view">
            <p><strong>Preferred Name:</strong> {preferredName || 'Not provided'}</p>
            <p><strong>School:</strong> {school || 'Not selected'}</p>
            <p><strong>Committees:</strong> {committees.length > 0 ? committees.join(', ') : 'None selected'}</p>
            <p><strong>Service Statement:</strong> {serviceStatement || 'Not provided'}</p>
            <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
