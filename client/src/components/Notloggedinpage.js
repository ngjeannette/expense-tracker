import React from 'react';
import '../App.scss';
import { Button, Text } from 'evergreen-ui';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NotLoggedInPage (props) {
    
    return(
        <div className='notlogged-page'>
            <Text>You're not logged, click here to log in </Text>
            <Button appearance="primary" onClick={() => { props.updateCurrentPath('login') }}><Link to="/login"> Log In</Link></Button>
        </div>
    )
};

export default NotLoggedInPage;