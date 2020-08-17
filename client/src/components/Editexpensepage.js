import React, { useState, useEffect } from 'react';
import '../App.scss';
import { Button, Alert, Heading, Select, TextInputField } from 'evergreen-ui';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function EditPage(props) {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [expensename, setExpensename] = useState('');
    const [expenseamount, setExpenseamount] = useState('');
    const [expensecategory, setExpensecategory] = useState('entertainment');
    const [expensedate, setExpenseDate] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndicator, setMessageIndicator] = useState('');
    
    let messageElement;
    if (messageIndicator === 'success') {
        messageElement = <Alert
            intent="success"
            title="Expense Updated"
            marginBottom={32}
        />
    } else if (messageIndicator === 'error') {
        messageElement = <Alert
            intent="danger"
            title="Incorrect Info"
            marginBottom={32}
        />
    };

    useEffect(()=>{},[username])
     useEffect(() => { }, [expenseamount])
    useEffect(() => { }, [expensecategory])
    useEffect(() => { }, [expensedate])
    useEffect(()=>{
        axios.get('/expense/' + props.id)
            .then(response => {
                setUsername(response.data.username);
                setExpensename(response.data.expensename);
                setExpenseamount(response.data.expenseamount);
                setExpensecategory(response.data.expensecategory);
                setExpenseDate(response.data.expensedate);
            })
    },[]);

    let updateExpenseToAxios = () => {
        let updatedExpense = { username, expensename, expenseamount, expensecategory, expensedate};
        axios.post('/expense/update/' + props.id, updatedExpense)
            .then(res => { console.log(res); setMessageIndicator('success')})
            .finally(() => { debugger; console.log('display');setShowMessage(true) })
    }

    return (
        <div className='editexpense-page'>
            <Heading size={700} marginTop="default">Edit Expense</Heading>
            <>
                <form className="createuser-page-form" onSubmit={ e => { e.preventDefault(); updateExpenseToAxios();setShowMessage(false);}}>
                    <TextInputField
                        width={300}
                        required
                        label="Expense Description"
                        name="text-input-name"
                        placeholder="Description"
                        onChange={(e) => { setExpensename(e.target.value) }}
                        value={expensename}
                    />
                    <TextInputField
                        width={300}
                        required
                        type="number"
                        label="Expense Amount"
                        name="text-input-name"
                        placeholder="Expense Amount"
                        onChange={(e) => { setExpenseamount(Number(e.target.value)) }}
                        value={expenseamount}
                    />
                    <TextInputField
                        required
                        width={300}
                        label="Expense Date"
                        name="text-input-name"
                        type="date"
                        placeholder="Expense Date"
                        onChange={(e) => { setExpenseDate(e.target.value) }}
                        value={expensedate}
                    />
                    <div className="select-label-container">
                        <label className="select-label">Expense Category</label>
                        <Select width={300} value={expensecategory} onChange={e => setExpensecategory(e.target.value)}>
                            <option value="housing">Housing</option>
                            <option value="transportation">Transportation</option>
                            <option value="taxes">Taxes</option>
                            <option value="debt">Debt</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="personel">Personel</option>
                            <option value="insurance">Insurance</option>
                        </Select>
                    </div>
                    <Button appearance="primary" type="submit" >Submit</Button>
                </form>
                <div className="message-container">
                    {showMessage && messageElement}
                </div>
            </>
        </div>
    )
};
export default EditPage;