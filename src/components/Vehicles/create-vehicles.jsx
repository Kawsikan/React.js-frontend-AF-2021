import React from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    code: '',
    model: '',
    type: '',
    vehicleName: '',
    categories: [],
    options: [],
    selectedCategory: []
}

export default class CreateVehicles extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectCategory = this.onSelectCategory.bind(this);
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
                    this.setState({ options: data });
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSelectCategory(e) {
        this.setState({ selectedCategory: e ? e.map(item => item.value) : [] });
    }


    onSubmit(e) {
        e.preventDefault();
        let vehicle = {
            code: this.state.code,
            model: this.state.model,
            type: this.state.type,
            name: this.state.vehicleName,
            categories: this.state.selectedCategory
        };
        console.log('DATA TO SEND', vehicle)
        axios.post('http://localhost:8080/vehicle/create', vehicle)
            .then(response => {
                alert('Vehicle inserted successfully')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }


    render() {
        return (
            <div className="container">
                <h1>Insert Vehicles</h1>

                <form onSubmit={this.onSubmit}>

                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            name="code"
                            value={this.state.code}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="model" className="form-label">Model</label>
                        <input
                            type="text"
                            className="form-control"
                            id="model"
                            name="model"
                            value={this.state.model}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="vehicleName" className="form-label">Vehicle Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="vehicleName"
                            name="vehicleName"
                            value={this.state.vehicleName}
                            onChange={this.onChange}
                        />
                    </div>

                    <Select
                        options={this.state.options}
                        onChange={this.onSelectCategory}
                        className="basic-multi-select"
                        isMulti
                    />
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>

            </div>
        )
    }
}