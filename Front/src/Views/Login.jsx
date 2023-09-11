import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';





export default function Login() {
    const clientID = '133571718056-qbem0tdcv46v6pk03e7v7qgmdpsvtg8p.apps.googleusercontent.com';
    const [provider, setProvider] = useState([])
    const [dataLog, setDataLog] = useState([])
    
    const [form, setForm] = useState({
        email:'',
        password:''
    });
    
    const [errors, setErrors] = useState({
        email:'',
        password:''
    });

    const changeHandler = (event) => {
        const nombre = event.target.name;
        const valor = event.target.value;
        console.log(nombre, valor);

        // validate({...form,[nombre]:valor}, errors);
        setForm({...form,[nombre]:valor});
    }

    const validate = (form, errors) =>{
        
        
    }


    return (
        <div>
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={form.email} onChange={changeHandler} name='email' />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" value={form.password} onChange={changeHandler} name='password'/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                </Form>

                <p>-----or-----</p>

                <LoginSocialGoogle
                    isOnlyGetToken
                    client_id={clientID}
                    scope="openid profile email"
                    // discoveryDocs="claims_supported"
                    // access_type="offline"
                    onResolve={async({ provider, data }) => {
                      console.log(data.access_token);
                      setProvider(provider);
                      setDataLog(data.access_token);
                    }}
                    onReject={(err) => {
                      console.log(err);
                    }}
                >
                    <GoogleLoginButton />
                </LoginSocialGoogle>
            </div>
        </div>
    )
}


// https://www.googleapis.com/oauth2/v3/userinfo
// Alexander Susa18:06
// let response = await axios.get(`${URL_API}/api/users/me`, {
//           headers: {
//             Authorization: `Bearer ${responseJwt}`,
//           },
//         });