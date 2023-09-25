import React, { useEffect, } from 'react'
import './DashBoard.css';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { UpdateProduct } from '../../Components/UpdateProuct/UpdateProduct';
import UserDashboard from '../../Components/UserDashboarView/UserDashboardView';
import Tabs from 'react-bootstrap/esm/Tabs';
import { useDispatch } from 'react-redux';
import { getUsersAct } from '../../Redux/userActions';
import { clearUsers } from '../../Redux/Reducers/userSlice';
import { StatisticsViews } from '../Statistics/StatisticsViews';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const DashBoard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.userState);
  const navigate = useNavigate();
import { PaymentStatisticsComponent } from '../Statistics/PaymentStatistics';


export const DashBoard = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(user.user.admin === false) {
      navigate('/home');
    }
    dispatch(getUsersAct());
      return () => {
      dispatch(clearUsers());
    };
  }, [dispatch, navigate, user]);

  return (
    <div className='mt-3'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className='rowTable'>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">VIEWS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">User Management</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">PURCHASE ORDERS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">UPDATE PRODUCTS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">STOCK</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">STATISTICS</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className='font'>
            <Tab.Content >
              
              <Tab.Pane eventKey="first">{<UpdateProduct/>}</Tab.Pane>
              <Tab.Pane eventKey="second">{<UserDashboard/>}</Tab.Pane>
              <Tab.Pane eventKey="third"><PaymentStatisticsComponent /></Tab.Pane>
              <Tab.Pane eventKey="fourth" >Second tab content</Tab.Pane>
              <Tab.Pane eventKey="fifth">Second tab content</Tab.Pane>
              <Tab.Pane eventKey="sixth"><StatisticsViews /></Tab.Pane>
              
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}
