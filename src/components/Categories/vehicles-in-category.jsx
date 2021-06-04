import React, { Component } from 'react';
import axios from 'axios';

class VehiclesInCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/category/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ vehicles: response.data.data })
      })
      .catch(error => {
        alert(error.message)
      })

  }

  render() {
    return (
      <div className="container">
        <h1>Vehicles in Category</h1>
        {this.state.vehicles.length > 0 && this.state.vehicles.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="p-3">
              <h4>Vehicle Code: {item.code}</h4>
              <h5>Vehicle Model: {item.model}</h5>
              <h4>Vehicle Type: {item.type}</h4>
              <h5>Vehicle Name: {item.name}</h5>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default VehiclesInCategory;