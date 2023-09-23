import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function UserSearchResult(props) {
    const {id, disable, email, image, name, lastname, nickname} = props;
    console.log('dsa',disable)
    const [switcha, setSwitcha] = useState(disable);
    console.log('asd',switcha)
    
    const changeHandler = () => {
        const newSwitcha = !switcha
        setSwitcha(newSwitcha)
        const banned = {disable: newSwitcha}
        axios.put(`/user/update/${id}`, banned);
    }

    return(
        <div >
            <img src={image} alt="Avatar" />
            <span>{nickname}</span>
            <span>{name}</span>
            <span>{lastname}</span>
            <span>{email}</span>
            <Form>
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