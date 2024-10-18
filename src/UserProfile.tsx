import React, { useState } from 'react';
import './UserProfile.css';
import Navbar from './components/navbar/Navbar';
import saveIcon from './assets/save-icon.png';

const UserProfile: React.FC = () => {
  const [preferredName, setPreferredName] = useState('');
  const [school, setSchool] = useState('');
  const [committees, setCommittees] = useState<string[]>([]);
  const [serviceStatement, setServiceStatement] = useState('');
  const [otherCommittee, setOtherCommittee] = useState(''); // State for "Other" input
  const [isOtherChecked, setIsOtherChecked] = useState(false); // State for "Other" checkbox
  
  const committeeOptions = ['COM1', 'COM2', 'COM3 '];

  const handleCheckboxChange = (committee: string) => {
    setCommittees((prev) =>
      prev.includes(committee)
        ? prev.filter((item) => item !== committee)
        : [...prev, committee]
    );
  };

  return (
      <div>
        <Navbar/>
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
              <select value={school} onChange={(e) => setSchool(e.target.value)}>
                <option value="">Select School</option>
                <option value="School of Business">School of Business</option>
                <option value="School of Science">School of Science</option>
                <option value="School of Liberal Arts">School of Liberal Arts</option>
              </select>
            </div>

            {/* Committee Checkboxes */}
            <div className="form-group">
              <label>Select the committees you have been a part of (can select multiple)</label>
              <div className="checkbox-group">
                {committeeOptions.map((committee) => (
                  <label key={committee}>
                    <input
                      type="checkbox"
                      checked={committees.includes(committee)}
                      onChange={() => handleCheckboxChange(committee)}
                    />
                    {committee}
                  </label>
                ))}
                
                {/* "Other" Checkbox */}
                <label>
                  <input
                    type="checkbox"
                    checked={isOtherChecked}
                    onChange={(e) => setIsOtherChecked(e.target.checked)}
                  />
                  Other
                </label>

                {/* Conditionally render the text input if "Other" is checked */}
                {isOtherChecked && (
                  <input
                    type="text"
                    value={otherCommittee}
                    onChange={(e) => setOtherCommittee(e.target.value)}
                    placeholder="Other Type Here"
                  />
                )}
              </div>
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
                <img src={saveIcon} alt="Save" />
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default UserProfile;
