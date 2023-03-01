import React from "react";
import '../css/header.css';
import axios from "axios";

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            devices: [],
        };
    }

    componentDidMount() {
        setInterval(() => {
        axios.get("http://localhost:5555/DHT22").then((response, error) => {
            console.log(response.data);
            const data = response.data;
            this.setState({ devices: data });
        });
    },3000)

    }
    render() {
        return (
            <>
                <div id="header">
                    <nav className="navbar bg-dark">
                        <div className="container">
                            <a className="navbar-brand justify-content-start me d-flex" href="/">
                                <img
                                    src={require('../images/RFID1.png')}
                                    alt="BiPhimTV"
                                    width={120}
                                    height={60}
                                    className="d-block ms-5"
                                />
                                <h4 className="name-logo mt-3">MyRFID</h4>
                            </a>

                            <ul className="nav justify-content-end mt-3 ms-5 ">
                                {this.state.devices.map((item) => (
                                    <li id="infor-device" key={item.id}>
                                          {item.humid}%,  {item.temperature}°C
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                    <div className="main-menu">
                        <ul className="nav justify-content-center bg-dark">
                            <li className="nav-item">
                                <a id="home-page" className="nav-link active" aria-current="page" href="/">
                                    Trang Chủ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/log">
                                    Quản Lý Điểm Danh
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/employee">
                                    Danh Sách Nhân Viên
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </>
        )
    }
}