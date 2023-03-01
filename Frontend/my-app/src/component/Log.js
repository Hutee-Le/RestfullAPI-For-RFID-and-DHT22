import axios from "axios";
import React from "react";
//import { Routes, Route, Link } from "react-router-dom";
//import { ref, remove } from "firebase/database";
// import { db } from '../firebaseConfig/index';
// import { uid } from "uid"
import "../css/log.css"
import "bootstrap/dist/css/bootstrap.min.css";

//import AddDevicePage from "./add_device";
//import UpdateDevice from "./update_device";

export class home extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    setInterval(() => {
      axios.get("http://localhost:5555/RFID").then((response) => {
        console.log(response.data);
        const data = response.data;
        this.setState({ items: data });
      })
    }, 1000);
  }


  render() {
    return (
      <main id="main">
        <h1 className="mt-5">Danh sách điểm danh</h1>
        <div className="container mt-5">

          <form action="/" method="POST">
            <table className="table table-hover table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>STT</th>
                  <th>UID</th>
                  <th>Họ & Tên</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>TimeIn</th>
                  <th>TimeOut</th>
                </tr>
              </thead>

              <tbody>
                {this.state.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td>{item.timein}</td>
                    <td>{item.timeout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </main>
    );
  }
}

export default home;
