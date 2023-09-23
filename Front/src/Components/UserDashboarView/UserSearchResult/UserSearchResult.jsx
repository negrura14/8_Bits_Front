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
        <div>
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