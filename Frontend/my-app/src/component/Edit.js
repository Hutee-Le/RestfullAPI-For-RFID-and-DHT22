import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from 'react';
import axios from "axios";

function Edit() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5555/RFID/' + id, {
            params: {
                id
            }
        })
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [id])
    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:5555/update/' + id, data)
            .then(res => {
                alert('data update successfully !')
                navigate('/employee')
            })
    }


    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light p-5'>
                <h3 className="text-dark">Update Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='id'>ID:</label>
                        <input type="text" name='id' value={data.id} className='form-control'
                        />
                    </div>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type="text" name='name' value={data.name} className='form-control'
                        onChange={e => { setData({ ...data, name: e.target.value })}}
                        />
                    </div>
                    <div>
                        <label htmlFor='gender'>Gender:</label>
                        <input type="text" name='gender' value={data.gender} className='form-control'
                        onChange={e => { setData({ ...data, gender: e.target.value })}}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input type="text" name='email' value={data.email} className='form-control'
                        onChange={e => { setData({ ...data, email: e.target.value })}}
                        />
                    </div>
                    <button className='btn btn-info mt-2'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default Edit;