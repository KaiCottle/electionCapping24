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
  const [email, setEmail] = useState(''); // New state to store user email

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch('/current-user', { // New endpoint to get current user email
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setEmail(data.email);
        } else {
          throw new Error('Failed to fetch user email');
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

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

    fetchUserEmail(); // Fetch user email on component mount
    fetchCommitteeNames();
    fetchSchoolNames();
  }, []);

  const handleCommitteeChange = (selectedOptions: any) => {
    setCommittees(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  const handleSave = async () => {
    try {
      // Check if user exists
      const checkResponse = await fetch(`/faculty-by-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!checkResponse.ok) {
        throw new Error('Error checking user existence');
      }

      const facultyData = await checkResponse.json();
      const userExists = facultyData.length > 0;

      if (userExists) {
        // Update user profile
        const response = await fetch('/update-user-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            firstName,
            lastName,
            preferredName,
            school,
            committees,
            serviceStatement,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          setIsEditing(false);
        } else {
          alert(data.message);
        }
      } else {
        // Create user profile
        const response = await fetch('/create-user-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            firstName,
            lastName,
            preferredName,
            school,
            committees,
            serviceStatement,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          setIsEditing(false);
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
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