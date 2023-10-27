import React , { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import LogoutButton from '../components/LogoutButton'
import { fetchFromAPI } from '../services/api'

const ProfileSettings = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('sampleemail@gmail.com');
  const [editedEmail, setEditedEmail] = useState('');
  const [phone, setPhone] = useState(4445559999);
  const [editedPhone, setEditedPhone] = useState('');
  const [editedMethod, setEditedMethod] = useState('');
  const [renderData, setData] = useState({
    "firstName": "Diana",
    "lastName": "Le",
    "middleName": null,
    "password": "12345",
    "userId": "diananle",
    "userName": "otherMeDee",
    "courses": ["Tango", "Alpha"],
    "phone": "1234566789",
    "email": "gmail.com",
    "major": "cs",
    "hours": null,
    "longBio": null
  })

  useEffect(() => {
    fetchFromAPI(`${props.renderType}/${props.userName}`) 
      .then(data => {
        const dataArray = Object.entries(data).map(([key, value]) => ({
          key,
          firstName: value.firstName,
          lastName: value.lastName,
          middleName: value.middleName,
          password: value.password,
          userId: value.userId,
          userName: value.userName,
          courses: value.courses,
          phone: value.phone,
          email: value.email,
          major: value.major,
          hours: value.hours,
          longBio: value.longBio
        }));
      })
      .catch(error => {
        setData({
          "firstName": "Test",
          "lastName": "Le",
          "middleName": null,
          "password": "12345",
          "userId": "diananle",
          "userName": "otherMeDee",
          "courses": ["Tango", "Alpha"],
          "phone": "1234566789",
          "email": "gmail.com",
          "major": "cs",
          "hours": null,
          "longBio": null
        });
        console.log(error);
      });
  }, []);


  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setEmail(editedEmail);
    setPhone(editedPhone);
  };

  const handleInputChange = (field, event) => {
    switch (field) {
      case 'editedEmail':
        setEditedEmail(event.target.value);
        break;
      case 'editedPhone':
        setEditedPhone(event.target.value);
        break;
      case 'editedMethod':
        setEditedMethod(event.target.value);
        break;
      default:
        break;
    }
  };

  const excludedFields = ["password", "userId", "firstName", "middleName", "lastName"];

  return (
      <div>
        <div>
          <LogoutButton></LogoutButton>
        </div>
        <div className="profile_page">
          <div className="sidebar">
            <Sidebar renderType={props.renderType}></Sidebar>
          </div>
          <div className="profile_settings">
              <div className="profile_info">
                  <div className="profile_photo">
                    <img src="https://picsum.photos/400/400" alt="Profile" />
                  </div>
                  <div className="profile_details"> 
                    <h3>{renderData.firstName + " "  + renderData.lastName}</h3>
                      {Object.entries(renderData).map(([field, value]) => (
                        !excludedFields.includes(field) && value != null && (
                          <div key={field}>
                            <h4 className="bio_h4"><span className="header_text">{field}: </span>{Array.isArray(value) ? value.join(', ') : value}</h4>
                          </div>
                        )))}
                  </div>
              </div>
              <div className="editFields">
              <form className="settingsForm">
              <label htmlFor="email">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  id="emailInput"
                  value={editedEmail}
                  onChange={(e) => handleInputChange('editedEmail', e)}
                />
              ) : (
                <span className="readOnly" id="emailDisplay">{renderData.email}</span>
              )}

              <label htmlFor="phone">Phone:</label>
              {isEditing ? (
                <input
                  type="tel"
                  id="phoneInput"
                  value={editedPhone}
                  onChange={(e) => handleInputChange('editedPhone', e)}
                />
              ) : (
                <span className="readOnly" id="phoneDisplay">{renderData.phone}</span>
              )}

              {isEditing ? (
                <button className="settingsButton" onClick={handleSaveClick}>Save</button>
              ) : (
                <button className="settingsButton" onClick={handleEditClick}>Edit</button>
              )}
            </form>
              </div>
          </div>
        </div>
      </div>
    );
  }


export default ProfileSettings;