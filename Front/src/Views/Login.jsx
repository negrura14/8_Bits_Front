import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login'

export default function Login() {
    return (
        <div>
            <LoginSocialGoogle
                client_id={"133571718056-qbem0tdcv46v6pk03e7v7qgmdpsvtg8p.apps.googleusercontent.com"}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                  console.log(provider, data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>
        </div>
    )
}