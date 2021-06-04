import React, { Component } from 'react';
import axios from 'axios';

const Vehicle = props => (
    <tr>
        <td>{props.vehicle.code}</td>
        <td>{props.vehicle.model}</td>
        <td>{props.vehicle.type}</td>
        <td>{props.vehicle.name}</td>
        {/* <td>{props.vehicle.categories}</td> */}
    </tr>
)

export default class Vehicles extends Component {

    constructor(props) {
        super(props);
        this.state = { vehicles: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/vehicle')
            .then(response => {
                console.log(response.data);
                this.setState({ vehicles: response.data.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    vehicleList() {
        return this.state.vehicles.map(function (currentVehicle, i) {
            return <Vehicle vehicle={currentVehicle} key={i} />;
        })
    }


    // render() {
    //     return (
    //         <div className="container">
    //             <h1>Courses</h1>
    //             {this.state.vehicles.length > 0 && this.state.vehicles.map((item, index) => (
    //                 <div key={index} className="card mb-3">
    //                     <div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}>
    //                         <h4>Course Name: {item.code}</h4>
    //                         <h5>Lecture: {item.model}</h5>
    //                         <h5>Code: {item.type}</h5>
    //                         <h6>Passmark: {item.name}</h6>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }

    render() {
        return (
            <div className="container">
                <h3>Vehicles</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Code</th>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Name</th>
                            {/* <th>Categories</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.vehicleList()}
                    </tbody>
                </table>
            </div>
        )
    }
}