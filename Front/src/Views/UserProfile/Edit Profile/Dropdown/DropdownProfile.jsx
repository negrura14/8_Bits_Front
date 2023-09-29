import Dropdown from "react-bootstrap/Dropdown";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileAction } from "../../../../Redux/userProfileActions";
import GeneralEdit from "../AccountEdit/GeneralEdit";
import AboutEdit from "../AboutEdit/AboutEdit";
import AvatarEdit from "../AvatarEdit/AvatarEdit";
import BackgroundEdit from "../BackgroundEdit/BackgroundEdit";
import PasswordEdit from "../PasswordEdit/PasswordEdit";
import "./DropdownProfile.css";
import { getUsersAct } from "../../../../Redux/userActions";
import LoadingPage from "../../../../Components/Loading/Loading";

export default function DropdownProfile() {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user.userState.user);
  const { users } = useSelector((state) => state.user.userState);
  const { userProfile } = useSelector((state) => state.userProfile);
  const { user } = useSelector((state) => state.user.userState);
  const [loading, setLoading] = useState(true);
  console.log(user)

  useEffect(() => {
    //console.log(user.email);
    dispatch(getUsersAct());
    dispatch(getUserProfileAction(user.user.email))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        alert("Error", error);
        setLoading(false);
      });
  }, [dispatch, user.email]);

  const [selectedOption, setSelectedOption] = useState("General");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case "General":
        return (
          <GeneralEdit
            currentUser={user.user}
            allUsers={users}
            userProfile={userProfile[0]}
          />
        );
      case "About":
        return (
          <AboutEdit
            currentUser={user.user}
            allUsers={users}
            userProfile={userProfile[0]}
          />
        );
      case "Avatar":
        return <AvatarEdit currentUser={user.user} />;
      case "Background":
        return <BackgroundEdit currentUser={user.user}/>
      case "Password":
        return <PasswordEdit currentUser={user.user} allUsers={users} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  } else {
    return (
      <div className=" row d-flex justify-content-center">
        <div className="navbarEP col-md-6 col-sm-10 ">
          <li
            className="list-itemEP"
            onClick={() => handleOptionChange("General")}
          >
            <i className="fa-solid fa-pen-to-square"></i>
            <span className="list-item-nameEP">General</span>
          </li>
          {user.authMethod === 'local' && <li
            className="list-itemEP"
            onClick={() => handleOptionChange("Password")}
          >
            <i className="fa-solid fa-key"></i>
            <span className="list-item-nameEP">Password</span>
          </li>}
          <li
            className="list-itemEP"
            onClick={() => handleOptionChange("About")}
          >
            <i className="fa-solid fa-address-card"></i>
            <span className="list-item-nameEP">About</span>
          </li>
          <li
            className="list-itemEP"
            onClick={() => handleOptionChange("Avatar")}
          >
            <i className="fa-solid fa-user"></i>
            <span className="list-item-nameEP">Avatar</span>
          </li>
          <li
            className="list-itemEP"
            onClick={() => handleOptionChange("Background")}
          >
            <i className="fa-solid fa-image"></i>
            <span className="list-item-nameEP">Background</span>
          </li>
        </div>
        {/*
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
        </Dropdown>*/}
        {renderSelectedComponent()}
      </div>
    );
  }
}
