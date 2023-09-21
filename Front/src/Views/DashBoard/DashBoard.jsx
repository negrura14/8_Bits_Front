import React from 'react'
import './DashBoard.css';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { UpdateProduct } from '../../Components/UpdateProuct/UpdateProduct';
import Tabs from 'react-bootstrap/esm/Tabs';

export const DashBoard = () => {

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
                <Nav.Link eventKey="second">UPDATE USERS</Nav.Link>
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
            </Nav>
          </Col>
          <Col sm={9} className='font'>
            <Tab.Content >
              
              <Tab.Pane eventKey="first">{<UpdateProduct/>}</Tab.Pane>
              <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
              <Tab.Pane eventKey="third">Second tab content</Tab.Pane>
              <Tab.Pane eventKey="fourth" >Second tab content</Tab.Pane>
              <Tab.Pane eventKey="fifth">Second tab content</Tab.Pane>
              
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}
