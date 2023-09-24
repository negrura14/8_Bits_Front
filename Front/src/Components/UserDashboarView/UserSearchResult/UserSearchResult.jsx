import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export default function UserSearchResult(props) {
    const { id, disable, email, image, name, lastname, nickname } = props;
    const [switcha, setSwitcha] = useState(disable);
    
    useEffect(() => {
        setSwitcha(disable);
    }, [disable]);

    const changeHandler = () => {
        const newSwitcha = !switcha;
        setSwitcha(newSwitcha);
        const banned = { disable: newSwitcha };
        axios.put(`/user/update/${id}`, banned);
    }

    return (
        <div className="productS">
        
                <div className="productS-img">
                <img src={image} alt="Avatar" />
                </div>
                <div className="productS-content">
                <h3>{name} {lastname}</h3>

                  <p className="productS-text price text-white-50">{nickname}</p>
                  <p className="productS-text price text-white-50">{email} </p>
                </div>
             
           
            
            
            <Form className='productS-text price'>
                <Form.Check // prettier-ignore
                
                    type="switch"
                    id="custom-switch"
                    label="Disable User"
                    checked={switcha}
                    onChange={changeHandler}
                />
            </Form>
        </div>
    ) 
}