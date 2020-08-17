import React from 'react';
import '../App.scss';
import { Heading , Button, Text} from 'evergreen-ui';
import {  Link } from "react-router-dom";
import ImageChart from '../image/chart.png';


function HomePage (props) {
    return(
        <div className='home-page'>
            <div className='chart-table'>
                <div><img src={ImageChart} alt='chart' /></div>
                {/* <div><img src={ImageChart} alt='table' /></div> */}
            </div>
            <div className='intro'>
                <Heading size={700} marginTop="default">Check out the expense project</Heading>
                <Text>Create, Read, Update, Delete Expenses</Text>
                <div className="start">
                    <Button appearance="primary" onClick={() => { props.updateCurrentPath('createuser') }} ><Link to="/createuser">Get Started</Link></Button>
                </div>
            </div>
        </div>
    )
};
export default HomePage;