import Dropdown from 'react-bootstrap/Dropdown';

import { useState } from 'react';

import AccountEdit from '../AccountEdit/AccountEdit';
import AboutEdit from '../AboutEdit/AboutEdit';
import AvatarEdit from '../AvatarEdit/AvatarEdit';

export default function DropdownProfile() {

    const [selectedOption,setSelectedOption] = useState("Account");

    const handleOptionChange = (option) => {
      setSelectedOption(option);
    }

    const renderSelectedComponent = () => {
      switch (selectedOption) {
        case "Account":
          return <AccountEdit />
        case "About":
          return <AboutEdit />
        case "Avatar":
          return <AvatarEdit />
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
            <Dropdown.Item onClick={() => handleOptionChange("Account")}>
              Account
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