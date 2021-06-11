import React from 'react';
import axios from 'axios';
import Select from 'react-select';

const initialState = {
    duration: 0,
    charge: 0,
    vehicles: [],
    categories: [],
    optionsVehicles: [],
    optionsCategory: [],
    selectedCategory: [],
    selectedVehicle: []
}

export default class CalculateCharge extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectCategory = this.onSelectCategory.bind(this);
        this.selectedVehicle = this.selectedVehicle.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:8080/category/')
            .then(response => {
                this.setState({ categories: response.data.data }, () => {
                    let data = [];
                    this.state.categories.map((item, index) => {
                        let category = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(category)
                    });
                    this.setState({ optionsCategory: data });
                })
            })
        axios.get('http://localhost:8080/vehicle/')
            .then(response => {
                this.setState({ vehicles: response.data.data }, () => {
                    let data = [];
                    this.state.vehicles.map((item, index) => {
                        let vehicle = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(vehicle)
                    });
                    this.setState({ optionsVehicles: data });
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSelectCategory(e) {
        this.setState({ selectedCategory: e ? e.map(item => item.value) : [] });
    }


    selectedVehicle(e) {
        this.setState({ selectedVehicle: e ? e.map(item => item.value) : [] });
    }

    onSubmit(e) {
        e.preventDefault();
        axios.get("http://localhost:8080/category/calculate/" + this.state.selectedCategory + "&" + this.state.duration)
            .then(response => {
                alert('Calculation successfully');
                console.log(response.data.totalCharge)
                this.setState({ charge: response.data.totalCharge });
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }


    render() {
        return (
            <div className="container">
                <h1>Calculate Charge</h1>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="code" className="form-label">Choose vehicle</label>
                    <Select
                        options={this.state.optionsVehicles}
                        onChange={this.selectedVehicle}
                        className="basic-multi-select"
                        isMulti
                    />
                    <br />
                    <label htmlFor="code" className="form-label">Choose vehicle</label>
                    <Select
                        options={this.state.optionsCategory}
                        onChange={this.onSelectCategory}
                        className="basic-multi-select"
                        isMulti
                    />
                    <br />
                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Duration</label>
                        <input
                            type="text"
                            className="form-control"
                            id="duration"
                            name="duration"
                            value={this.state.duration}
                            onChange={this.onChange}
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Calculate</button>
                    <br />
                    <div className="mb-3">
                        <label htmlFor="charge" className="form-label">Charge</label>
                        <input
                            type="text"
                            className="form-control"
                            id="charge"
                            name="charge"
                            value={this.state.charge}
                            onChange={this.onChange}
                        />
                    </div>

                </form>
            </div>
        );
    }
}

