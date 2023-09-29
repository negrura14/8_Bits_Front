import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./TabProfile.css"
import UserProfile from './Profile/UserProfile';
import DropdownProfile from './Edit Profile/Dropdown/DropdownProfile';
import Review from './Profile/profileReviews';

function TabProfile() {
  return (
    <div className='tabsU'>

    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="profile" title={<span>Profile <i className="fa-solid fa-user"></i></span>}>
        <UserProfile />
      </Tab>
      <Tab eventKey="edit" title={<span>Edit Profile <i className="fa-solid fa-pen"></i></span>}>
        <DropdownProfile />
      </Tab>
      <Tab eventKey="reviews" title={<span>Reviews <i className="fa-solid fa-book"></i></span>}>
        <Review/>
      </Tab>
    </Tabs>
    </div>
  );
}

export default TabProfile;