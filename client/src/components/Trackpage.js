import React, { useState, useEffect } from 'react';
import '../App.scss';
import { Heading} from 'evergreen-ui';
import NotLoggedInPage from './Notloggedinpage'
import ChartPage from './Chartpage'

function TrackPage(props) {
    return (
        <>
            {Object.keys(props.userInfo).length > 0 ?
                <>
                    <ChartPage userInfo={props.userInfo} updateCurrentPath={props.updateCurrentPath} updateid={props.updateid}  />
                </>
                :
                <div className='track-page'>
                    <Heading size={700} marginTop="default">Track Expense</Heading>
                    <NotLoggedInPage updateCurrentPath={props.updateCurrentPath} />
                </div>
            }
        </>
    )
};
export default TrackPage;