import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Navbar from './components/navbar/Navbar';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [preferredName, setPreferredName] = useState('');
  const [school, setSchool] = useState('');
  const [committees, setCommittees] = useState<string[]>([]);
  const [serviceStatement, setServiceStatement] = useState('');
  const [schoolOptions, setSchoolOptions] = useState<{ value: string; label: string }[]>([]);
  const [committeeOptions, setCommitteeOptions] = useState<{ value: string; label: string }[]>([]);

  // Fetch schools and committees
  useEffect(() => {
    // Fetch Schools
    fetch('https://facelect.capping.ecrl.marist.edu:3001/schools')
      .then((response) => response.json())
      .then((data) => {
        const formattedSchools = data.map((school: { SID: number; Sname: string }) => ({
          value: school.Sname,
          label: school.Sname,
        }));
        setSchoolOptions(formattedSchools);
      })
      .catch((error) => console.error('Error fetching schools:', error));

    // Fetch Committees
    fetch('https://facelect.capping.ecrl.marist.edu:3001/committees')
      .then((response) => response.json())
      .then((data) => {
        const formattedCommittees = data.map((committee: { CID: number; Cname: string }) => ({
          value: committee.Cname,
          label: committee.Cname,
        }));
        setCommitteeOptions(formattedCommittees);
      })
      .catch((error) => console.error('Error fetching committees:', error));
  }, []);

  const handleCommitteeChange = (selectedOptions: any) => {
    setCommittees(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Trigger a save to the database here if needed
  };

  return (
    <div className='container'>
      <Navbar />
      <h1 className='title'>Your Election Profile</h1>
      <div className="profile-form-container">
        {isEditing ? (
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
              </button>
            </div>
          </form>
        ) : (
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
