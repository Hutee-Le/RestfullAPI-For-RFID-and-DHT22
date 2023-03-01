import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [inputData, setInputData] = useState({ id: '', name: '', gender: '', email: '' })

    const navigat = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:5555/RFID', inputData)
            .then(res => {
                alert("Data Added Success!");
                navigat('/employee');
            }).catch(err => console.log(err))
    }
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light p-5'>
                <h3 className="text-dark">Create New Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='id'>ID:</label>
                        <input type="text" name='id' className='form-control' 
                        onChange={e=>{setInputData({...inputData, id:e.target.value})}}/>
                    </div>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type="text" name='name' className='form-control' 
                        onChange={e=>{setInputData({...inputData, name:e.target.value})}}/>
                    </div>
                    <div>
                        <label htmlFor='gender'>Gender:</label>
                        <input type="text" name='gender' className='form-control' 
                        onChange={e=>{setInputData({...inputData, gender:e.target.value})}}/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input type="text" name='email' className='form-control' 
                        onChange={e=>{setInputData({...inputData, email:e.target.value})}}/>
                    </div>
                    <button className='btn btn-success mt-2'>Create</button>
                </form>

            </div>
        </div>
    )
}

export default Add