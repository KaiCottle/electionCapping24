import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Navbar from './components/navbar/Navbar';
import saveIcon from './assets/save-icon.png';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [school, setSchool] = useState('');
  const [committees, setCommittees] = useState<string[]>([]);
  const [serviceStatement, setServiceStatement] = useState('');
  const [committeeOptions, setCommitteeOptions] = useState<{ value: string, label: string }[]>([]);
  const [schoolOptions, setSchoolOptions] = useState<{ value: string, label: string }[]>([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCommitteeNames = async () => {
      try {
        const response = await fetch('/committees', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching committee names: ${response.statusText}`);
        }
        const data = await response.json();
        const options = data.map((committee: { cname: string }) => ({
          value: committee.cname,
          label: committee.cname,
        }));
        setCommitteeOptions(options);
      } catch (error) {
        console.error('Error fetching committee names:', error);
      }
    };

    const fetchSchoolNames = async () => {
      try {
        const response = await fetch('/schools', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching school names: ${response.statusText}`);
        }
        const data = await response.json();
        const options = data.map((school: { sname: string }) => ({
          value: school.sname,
          label: school.sname,
        }));
        setSchoolOptions(options);
      } catch (error) {
        console.error('Error fetching school names:', error);
      }
    };

    fetchCommitteeNames();
    fetchSchoolNames();
  }, []);

  const handleCommitteeChange = (selectedOptions: any) => {
    setCommittees(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Trigger save to the database here
  };

  const handleCheckEmail = async () => {
    try {
      const response = await fetch('https://facelect.capping.ecrl.marist.edu/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.found) {
        setPreferredName(data.preferredName);
        setSchool(data.school);
        setCommittees(data.committees);
        setServiceStatement(data.serviceStatement);
        setError('');
      } else {
        setError('Email not found. Click "Edit Profile" to create a new profile 4.');
      }
    } catch (err) {
      console.error('Error checking email:', err);
      setError('An error occurred. Please try again.');
    }
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
              <label>Enter your first name: </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your First Name Here"
              />
              <label>Enter your last name: </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Your Last Name Here"
              />
            </div>
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
            <div className="email-check">
              <label>Enter marist email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@marist.edu"
              />
              <button type="button" className="check-button" onClick={handleCheckEmail}>
                Check
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;