import axios from "axios";
import React from "react";
import "../css/employee.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import Add from './Add';
import "bootstrap/dist/css/bootstrap.min.css";

export class home extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5555/RFID").then((response, error) => {
            console.log(response.data);
            const data = response.data;
            this.setState({ items: data });
        });
    }

    delete(id) {
        if (id !== undefined) {
            axios.delete('http://localhost:5555/delete/' + id)
                .then(response => {
                    console.log(response);
                    // Show an alert message
                    alert(`UID ${id} deleted successfully!`);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    } 
    render() {
        return (
            <main id="main">
                <h1 className="mt-5">Danh sách nhân viên</h1>
                <div className="container mt-5">
                    <Link to="/add" id="add-employee" className="btn btn-success mb-3">
                        New Employee
                    </Link>
                    <table className="table table-hover table-bordered table-striped" >
                        <thead className="thead-dark ">
                            <tr>
                                <th>STT</th>
                                <th>UID</th>
                                <th>Họ &y Tên</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Link to={`/update/${item.id}`} className="btn btn-warning" >Edit</Link>
                                        <button className="btn btn-danger ms-4" onClick={e => {
                                            this.delete(item.id);
                                            window.location.reload();
                                            //e.preventDefault();
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Routes>
                    <Route path="/add" element={<Add />} />
                </Routes>
            </main>
        );
        
    }
    
}
export default home;
