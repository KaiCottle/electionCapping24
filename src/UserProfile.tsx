import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Navbar from './components/navbar/Navbar';
import saveIcon from './assets/save-icon.png';
import arrowIcon from './assets/arrow-icon.png'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import Footer from './components/footer/footer';

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
  const [profileExists, setProfileExists] = useState(false);
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

    const fetchUserData = async () => {
      try {
        const response = await fetch('/get-user-data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const data = await response.json();
    
        if (data.found) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setPreferredName(data.preferredName);
          setSchool(data.school);
          setCommittees(data.committees);
          setServiceStatement(data.serviceStatement);
          setProfileExists(true); // Profile exists
          setError('');
        } else {
          setProfileExists(false); // Profile does not exist
          setError('Profile not found. Click "Edit Profile" to create a new profile.');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('An error occurred. Please try again.');
      }
    };

    fetchCommitteeNames();
    fetchSchoolNames();
    fetchUserData();
  }, []);

  const handleCommitteeChange = (selectedOptions: any) => {
    setCommittees(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  const handleSave = async () => {
    // Prepare the data to be sent
    const payload = {
      firstName,
      lastName,
      preferredName,
      school,
      committees,
      serviceStatement,
    };
  
    // Decide the endpoint and method based on profile existence
    const endpoint = profileExists ? '/edit-faculty' : '/create-faculty';
    const method = profileExists ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        // Handle success
        setProfileExists(true); // Profile now exists
        setIsEditing(false); // Exit edit mode
      } else {
        // Handle errors
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const dropdownStyle = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? '2px solid #B80E0E' : '2px solid #5a5a5a',
      boxShadow: state.isFocused ? '0 0 8px rgba(184, 14, 14, 0.5)' : 'none',
      '&:hover': {
        border: state.isFocused ? '2px solid #B80E0E' : '2px solid #5a5a5a',
      },
      borderRadius: '5px',
      width: '105%',
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 5,
    }),
  };

  return (
    <div className='container'>
      <Navbar />
      <h1 className='title'>Your Election Profile</h1>
      <div className="profile-form-container">
        {isEditing ? (
          // Edit State
          <div className="editing-header">
          <button
            type="button"
            className="go-back-button"
            onClick={() => setIsEditing(false)}
          >
            <img src={arrowIcon} alt="Back arrow" className="back-arrow" />
            <strong>Go Back</strong>
          </button>
          <form className="profile-form">
            <div className="form-group">
              <label>Enter your first name: </label>
              <input
                type="text"
                id='inputBox'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your First Name Here"
              />
            </div>
            <div className='form-group'>
              <label>Enter your last name: </label>
              <input
                type="text"
                id='inputBox'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Your Last Name Here"
              />
            </div>
            <div className="form-group">
              <label>Enter your preferred name (how it will appear on the ballot)</label>
              <input
                type="text"
                id='inputBox'
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
                styles={dropdownStyle}
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
                styles={dropdownStyle}
              />
            </div>
            <div className="form-group">
              <label>Create a Service Statement (Why someone should vote for you)</label>
              <textarea
                value={serviceStatement}
                id='inputBox'
                onChange={(e) => setServiceStatement(e.target.value)}
                placeholder="Enter your statement here"
                maxLength={300}
              />
              <small>{serviceStatement.length}/300</small>
            </div>
            <div className="form-group">
            <button type="button" className="save-button" onClick={handleSave}>
              {profileExists ? 'Save Changes' : 'Create Profile'}
            </button>
            </div>
          </form>
        </div>
        ) : (
          // View State
          <div className="profile-view">
            <p><strong>First Name:</strong> {firstName || 'Not Provided'}</p>
            <p><strong>Last Name:</strong>{lastName || 'Not Provided'}</p>
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