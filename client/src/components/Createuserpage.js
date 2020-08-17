import React, { useState } from 'react';
import '../App.scss';
import { Button, TextInput, Alert, Text, Heading } from 'evergreen-ui';
import axios from 'axios';

function CreateUserPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndicator, setMessageIndicator] = useState('');

    let checkDuplicates = ()  => {
        return axios.get('/user/', { params: { username,password } })
            .then(response => {
                if(response.data){
                    setMessageIndicator('duplicate');
                    setShowMessage(true)
                    return true;
                } else {
                    return false
                }
            })
            .catch(err => {console.log(err + 'errorcheckduplicates')})
    };

    let applyChanges = async () => {
        const user = {
            username: username,
            password: password
        };
        let checkDuplicateValue = true;
        if(!username || !password){
            setMessageIndicator('error')
            setShowMessage(true);
        } else {
            checkDuplicateValue = await checkDuplicates();
        }

        // check for duplicates
        if (!checkDuplicateValue) {
            axios.post('/user/add', user)
                .then(res => { setMessageIndicator('success')})
                .catch(error => { 
                    console.log('error', error)
                    if (error.response.data.includes('error')) {setMessageIndicator('error');}
                } )
                .finally(() => {setShowMessage(true)})
        }
    };
    let messageElement;

    if(messageIndicator === 'success'){
        messageElement = <Alert
            intent="success"
            title="User Created"
            marginBottom={32}
        />
    } else if (messageIndicator === 'duplicate') {
        messageElement = <Alert
            intent="danger"
            title="User already exists"
            marginBottom={32}
        />
    } else {
        messageElement = <Alert
            intent="danger"
            title="Incorrect Info"
            marginBottom={32}
        />
    }

    return (
        <div className='createuser-page'>
            <div className='create-user-container'>
                <Heading size={700} marginTop="default">Create Account</Heading>
                <Text>Create, Read, Update, Delete Expenses</Text>
                <form className="createuser-page-form">
                    <Text>
                        <label value='username'>Username</label>
                    </Text>
                    <TextInput
                        name="text-input-name"
                        onChange={(e) => { setUsername(e.target.value)}}
                    />
                    <Text>
                        <label value='password'>Password</label>
                    </Text>

                    <TextInput
                        name="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                        <Button appearance="primary" onClick={(e)=>{e.preventDefault(); applyChanges()}}>Submit</Button>
                </form>

                <div className='message-container'>
                {showMessage && messageElement}
                </div>
            </div>
        </div>
    )
};
export default CreateUserPage;