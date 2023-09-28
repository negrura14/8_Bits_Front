import React, { useEffect } from 'react'
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
import { PaymentStatisticsComponent } from '../Statistics/PaymentStatistics';
import { getAllPayments, totalSales } from '../../Redux/paymentsActions';
import { topSellingGames } from '../../Redux/paymentsActions';
import CreateGame from '../../Components/Create Game/CreateGame';

import { GameStockComponent } from '../Statistics/GameStock';


export const DashBoard = () => {
  const { user } = useSelector((state) => state.user.userState);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(topSellingGames());
    dispatch(totalSales());
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
                <Nav.Link eventKey="first">UPLOAD GAME</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">USER MANAGEMENT</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">PURCHASE ORDERS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">PRODUCT MANAGEMENT</Nav.Link>
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
              
              <Tab.Pane eventKey="first">{<CreateGame/>}</Tab.Pane>
              <Tab.Pane eventKey="second">{<UserDashboard/>}</Tab.Pane>
              <Tab.Pane eventKey="third"><PaymentStatisticsComponent /></Tab.Pane>
              <Tab.Pane eventKey="fourth" >{<UpdateProduct/>}</Tab.Pane>
              <Tab.Pane eventKey="fifth"><GameStockComponent /></Tab.Pane>
              <Tab.Pane eventKey="sixth"><StatisticsViews /></Tab.Pane>
              
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}
