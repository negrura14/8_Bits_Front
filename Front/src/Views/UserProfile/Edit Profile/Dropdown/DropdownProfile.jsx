import Dropdown from 'react-bootstrap/Dropdown';

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileAction } from '../../../../Redux/userActions';

import GeneralEdit from '../AccountEdit/GeneralEdit';
import AboutEdit from '../AboutEdit/AboutEdit';
import AvatarEdit from '../AvatarEdit/AvatarEdit';
import PasswordEdit from '../PasswordEdit/PasswordEdit';

import { getUsersAct } from '../../../../Redux/userActions';


export default function DropdownProfile() {
    const dispatch = useDispatch();
    const { user,users } = useSelector((state) => state.user.userState);
    const { userProfile } = useSelector((state) => state.user.userState);


    useEffect(() => {
      dispatch(getUsersAct());
    }, [dispatch]);
    

    const [selectedOption,setSelectedOption] = useState("General");

    const handleOptionChange = (option) => {
      setSelectedOption(option);
    }

    const renderSelectedComponent = () => {
      switch (selectedOption) {
        case "General":
          return <GeneralEdit currentUser={user.user} allUsers={users} userProfile={userProfile[0]}/>
        case "About":
          return <AboutEdit currentUser={user.user} allUsers={users} userProfile={userProfile[0]}/>
        case "Avatar":
          return <AvatarEdit currentUser={user.user}/>
        case "Password":
          return <PasswordEdit currentUser={user.user} allUsers={users}/>
        default:
          return null;  
      }
    };


    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Edit
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOptionChange("General")}>
              General
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOptionChange("Password")}>
              Password
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOptionChange("About")}>
              About
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOptionChange("Avatar")}>
              Avatar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {renderSelectedComponent()}
      </div>
      );
}