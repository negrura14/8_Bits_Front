import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./TabProfile.css"
import UserProfile from './Profile/UserProfile';
import DropdownProfile from './Edit Profile/Dropdown/DropdownProfile';

function TabProfile() {
  return (
    <div className='tabsU'>

    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="profile" title={<span>Profile <i class="fa-solid fa-user"></i></span>}>
        <UserProfile />
      </Tab>
      <Tab eventKey="edit" title={<span>Edit Profile <i class="fa-solid fa-pen"></i></span>}>
        <DropdownProfile />
      </Tab>
      <Tab eventKey="reviews" title={<span>Reviews <i class="fa-solid fa-book"></i></span>}>
        Tab content for Reviews
      </Tab>
      <Tab eventKey="games" title={<span>Games <i class="fa-solid fa-gamepad"></i></span>}>
        Tab content for Games
      </Tab>
    </Tabs>
    </div>
  );
}

export default TabProfile;