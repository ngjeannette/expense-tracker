import React from 'react';
import '../App.scss';
import { Button, Text, Heading } from 'evergreen-ui';
import { Link } from "react-router-dom";

function noDataPage(props) {
    return (
        <div className='nodata-page'>
            <Heading size={700} marginTop="default">Track Expense</Heading>
            <Text>No data, click here to create Expense</Text>
            <Button appearance="primary" onClick={() => { props.updateCurrentPath('createexpense') }} >
                <Link to="/createexpense" onClick={() => { props.updateCurrentPath('createexpense') }} >Create Expense</Link>
            </Button>
        </div>
    )
};

export default noDataPage;