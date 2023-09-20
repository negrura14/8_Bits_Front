import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import UserProfile from './Profile/UserProfile';
import DropdownProfile from './Edit Profile/Dropdown/DropdownProfile';

function TabProfile() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="profile" title="Profile">
        <UserProfile />
      </Tab>
      <Tab eventKey="edit" title="Edit Profile">
        <DropdownProfile />
      </Tab>
      <Tab eventKey="reviews" title="Reviews">
        Tab content for Reviews
      </Tab>
      <Tab eventKey="games" title="Games">
        Tab content for Games
      </Tab>
    </Tabs>
  );
}

export default TabProfile;