import React, { useEffect } from 'react';
import '../App.scss';
import { TabNavigation, Tab, Text, Avatar } from 'evergreen-ui';
import { Link } from "react-router-dom";

function Tabs (props) {
    useEffect(() => {}, [props.userInfo])
    return(
        <TabNavigation>
            <div className='tab-left'>
                <Tab is="a" href="https://flaviocopes.com/sample-app-ideas/" >Project 5</Tab>
                <Tab onSelect={() => { props.updateCurrentPath('home')}}><Link to="/"  >Home</Link></Tab>            
                <Tab onSelect={() => { props.updateCurrentPath('createexpense') }}><Link to="/createexpense" >Create Expense</Link></Tab>            
                <Tab onSelect={() => { props.updateCurrentPath('track') }}><Link to="/track" >Track Expense</Link></Tab>
                <Tab onSelect={() => { props.updateCurrentPath('login') }}><Link to="/login" >Log in</Link></Tab>            
                <Tab onSelect={() => { props.updateCurrentPath('createuser') }}><Link to="/createuser" >Sign Up</Link></Tab>            
            </div>
            <div className='tab-right'>
                {Object.keys(props.userInfo).length > 0 && <Text> Welcome {props.userInfo.username}</Text>}         
            </div>
        </TabNavigation>
    )
}
export default Tabs;