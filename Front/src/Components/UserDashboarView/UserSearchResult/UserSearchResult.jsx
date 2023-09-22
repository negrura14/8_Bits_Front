import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function UserSearchResult(props) {
    const { disable, email, image, name, lastname, nickname} = props;
    const [switcha, setSwitcha] = useState(false);
    
    const changeHandler = (event) => {
        setSwitcha(!switcha)
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