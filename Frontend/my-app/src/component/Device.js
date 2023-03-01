import React from "react";
import { data } from "../data";
import '../css/device.css';
export default function Device() {
    
    return (
        <>
            <div id="main">
                <div className="device">
                    <h1>Danh sách các thiết bị</h1>
                    <div className="container mt-5">
                        <div className="row">
                            {data.map((device, index) => {
                                return (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 device-item" key={index}>
                                        <div className="card">
                                            <img src={device.imageUrl} className="card-img-top" style={{ width: "18rem" }} alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{device.deviceName}</h5>
                                                <p className="card-text">{device.deviceDecription}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}