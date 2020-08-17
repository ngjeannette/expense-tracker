import React, { useState, useEffect } from 'react';
import '../App.scss';
import { Button, Alert, Select, TextInputField, Heading} from 'evergreen-ui';
import NotLoggedInPage from './Notloggedinpage'
import axios from 'axios';
import moment from 'moment';

function CreateExpense(props) {
    const currentDate = moment().format('YYYY-MM-DD').toString();

    const [username, setUsername] = useState('');
    const [expensename, setExpensename] = useState('');
    const [expenseamount, setExpenseamount] = useState('');
    const [expensecategory, setExpensecategory] = useState('entertainment');
    const [expensedate, setExpenseDate] = useState(currentDate);
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndicator, setMessageIndicator] = useState('');
    
    useEffect(()=>{
        setUsername(props.userInfo.username)
    },[props.userInfo]);

    useEffect(() => {}, [expensedate])

    let addExpenseToAxios = () => {
        const newExpense = {
            username, expensename, expenseamount, expensecategory, expensedate
        };
        if(!expensename || !expensename){
            setShowMessage(false)
        } else {
            axios.post('/expense/add', newExpense)
                .then(response => {setMessageIndicator('success')})
                .catch(err => setMessageIndicator('error'))
            .finally(()=>{setShowMessage(true)})
        }

    };

    let messageElement;

    if (messageIndicator === 'success') {
        messageElement = <Alert
            intent="success"
            title="Expense Created"
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
        <div className='createexpense-page'>
            <Heading size={700} marginTop="default">Create Expense</Heading>
            {Object.keys(props.userInfo).length > 0 ? 
            <>
                    <form className="createuser-page-form" onSubmit={e => {  addExpenseToAxios(); e.preventDefault()}}>
                    <TextInputField
                        width={300}
                        required
                        label="Expense Description"
                        name="text-input-name"
                        placeholder="Description"
                        onChange={(e) => { setExpensename(e.target.value) }}
                    />
                    <TextInputField
                        width={300}
                        required
                        type="number"
                        label="Expense Amount"
                        name="text-input-name"
                        placeholder="Expense Amount"
                        onChange={(e) => { setExpenseamount(Number(e.target.value)) }}
                    />
                    <TextInputField
                        required
                        width={300}
                        label="Expense Date"
                        name="text-input-name"
                        type="date"
                        value={expensedate}
                        placeholder="Expense Date"
                        onChange={(e) => { setExpenseDate(e.target.value) }}
                    />
                        <div className="select-label-container">
                        <label className="select-label">Expense Category</label>
                        <Select label="Expense Category" id='category' required  width={300} value={expensecategory} onChange={e => setExpensecategory(e.target.value)}>
                            <option value="housing">Housing</option>
                            <option value="transportation">Transportation</option>
                            <option value="taxes">Taxes</option>
                            <option value="debt">Debt</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="personel">Personel</option>
                            <option value="insurance">Insurance</option>
                        </Select>
                    </div>
                
                    <Button appearance="primary" type="submit" onClick={(e) => { setShowMessage(false);}}>Submit</Button>
                </form>
                <div className="message-container">
                    {showMessage && messageElement}
                </div>
            </>
                : <NotLoggedInPage updateCurrentPath={props.updateCurrentPath} />
        }
        </div>
    )
};
export default CreateExpense;