import React, { useState } from 'react';
import './UserProfile.css';
import Navbar from './components/navbar/Navbar';
import saveIcon from './assets/save-icon.png';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const UserProfile: React.FC = () => {
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

  return (
    <div>
      <Navbar />
      <h1>Your Election Profile</h1>
      <div className="profile-form-container">
        <form className="profile-form">
          {/* Preferred Name Input */}
          <div className="form-group">
            <label>Enter your preferred name (how it will appear on ballot)</label>
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              placeholder="Your Preferred Name Here"
            />
          </div>

          {/* Dropdown for School */}
          <div className="form-group">
            <label>Select your School from the dropdown menu</label>
            <Select
              options={schoolOptions}
              value={schoolOptions.find(option => option.value === school)}
              onChange={(selectedOption) => setSchool(selectedOption?.value || '')}
              placeholder="Select School"
            />
          </div>

          {/* Multi-select Committees */}
          <div className="form-group">
            <label>Select the committees you have been a part of (can select multiple)</label>
            <CreatableSelect
              isMulti
              options={committeeOptions}
              onChange={handleCommitteeChange}
              placeholder="Select or input committees"
            />
          </div>

          {/* Service Statement */}
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

          {/* Save Button */}
          <div className="form-group">
            <button type="submit" className="save-button">
              <p>Save Profile</p>
             {/*<img src={saveIcon} alt="Save" />*/}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
