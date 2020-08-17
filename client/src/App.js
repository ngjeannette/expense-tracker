import React, { useState, useEffect } from 'react';
import './App.scss';
import TabsPage from './components/Tab';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './components/Homepage'
import CreateUserPage from './components/Createuserpage'
import LoginPage from './components/Loginpage'
import CreateExpense from './components/Createexpensepage';
import TrackPage from './components/Trackpage';
import EditPage from './components/Editexpensepage';
import ForgotPassWordPage from './components/Forgotpassword';

function App() {
  const [currentPath, setCurrentPath] = useState('home');
  const [userInfo, setUserInfo] = useState({});
  const [id, setId] = useState({});

  let updateCurrentPath = (path) => {
    setCurrentPath(path);
  };

  let updateUserInfo = (object) => {
    setUserInfo(object)
  };
  let updateid = (id) => {
    console.log('id', id)
    setId(id)
  }

  useEffect(() => { }, [currentPath])
  useEffect(() => {  }, [id])

  return (
    <>
      <Router>
        {<TabsPage currentPath={currentPath} updateCurrentPath={updateCurrentPath} userInfo={userInfo} />}
        <Route path="/" exact render={(props) => (<HomePage {...props} isAuthed={true} updateCurrentPath={updateCurrentPath} />)} />
        <Route path="/createuser" render={(props) => (<CreateUserPage {...props} isAuthed={true} />)} />
        <Route path="/login" render={(props) => (<LoginPage {...props} isAuthed={true} updateUserInfo={updateUserInfo} updateCurrentPath={updateCurrentPath} />)} />
        <Route path="/createexpense" render={(props) => (<CreateExpense {...props} isAuthed={true} updateUserInfo={updateUserInfo} updateCurrentPath={updateCurrentPath} userInfo={userInfo}  />)} />
        <Route path="/track" render={(props) => (<TrackPage {...props} isAuthed={true} userInfo={userInfo} updateCurrentPath={updateCurrentPath} updateid={updateid}  />)}  />
        <Route path="/edit/:id" render={(props) => (<EditPage {...props} isAuthed={true} id={id} />)}  />
        <Route path="/forgotpassword" render={(props) => (<ForgotPassWordPage {...props} isAuthed={true} updateCurrentPath={updateCurrentPath} />)}  />
        
      </Router>
    </>
  );
}

export default App;