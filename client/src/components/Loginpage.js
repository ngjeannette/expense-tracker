import React, { useState } from 'react';
import '../App.scss';
import { Button, TextInput, Alert, Text, Heading } from 'evergreen-ui';
import axios from 'axios';
import { Link } from "react-router-dom";

function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndicator, setMessageIndicator] = useState('');
    let messageElement;

    let verify = () => {
        const user = {
            username: username,
            password: password
        };
      axios.get('/user/login', { params : { username, password }})
      .then(response => {
          if(response.data) {
            // after verifying, pass the entire object of the USER INFO (USERNAME & PASSWORD)
            props.updateUserInfo(response.data);
            setMessageIndicator('success');
          } else {
              setMessageIndicator('error');
          }
      })
        .catch(err => setMessageIndicator('error'))
      .finally(() => {setShowMessage(true)})
    };


    if (messageIndicator === 'success') {
        messageElement = <Alert
            intent="success"
            title="Logged In"
            marginBottom={32}
        />
    } else if (messageIndicator === 'error') {
        messageElement = <Alert
            intent="danger"
            title="Incorrect Info"
            marginBottom={32}
        />
    } 

    return (
        <div className='login-page'>
            <div className='login-user-container'>
                <Heading size={700} marginTop="default">Login</Heading>
                <form className="login-page-form">
                    <Text>
                        <label value='username'>Username</label>
                    </Text>
                    <TextInput
                        name="text-input-name"
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <Text>
                        <label value='password'>Password</label>
                    </Text>

                    <TextInput
                        name="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    
                    <Button appearance="minimal" intent="none" marginBottom={10} 
                        onClick={(e) => { e.preventDefault(); props.updateCurrentPath('forgotpassword') }} >
                        <Link to={"/forgotpassword"} className="forgotPassword">Forgot Password ?</Link>
                    </Button>
                    <Button appearance="primary" onClick={(e) => { e.preventDefault(); verify() }}>Submit</Button>
                </form>

                <div className='message-container'>
                    {showMessage && messageElement}
                </div>
            </div>
        </div>
    )
};
export default LoginPage;