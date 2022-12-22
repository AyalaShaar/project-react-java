import React, { Component } from 'react'
import CustomerService from '../services/CustomerService'
import moment from "moment";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customers: [],
            filterText: ''
        }
        this.editCustomer = this.editCustomer.bind(this);
        this.changeFilterTextHandler = this.changeFilterTextHandler.bind(this);
    }

    editCustomer(id) {
        this.props.history.push(`/edit-customers/${id}`);
    }

    changeFilterTextHandler = (event) => {
        this.setState({ filter: event.target.value });
        if (this.state.customers.length > 0 && event.target.value) {
            this.setState({ customers: this.state.customers.filter(customer => (customer.name.includes(event.target.value) || customer.lastName.includes(event.target.value) || customer.date.includes(event.target.value) || customer.phone.includes(event.target.value)))});
        } else
            CustomerService.getEmployees().then((res) => {
                this.setState({ customers: res.data });
            });
    }

    componentDidMount() {
        CustomerService.getEmployees().then((res) => {
            this.setState({ customers: res.data });
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="form-group">
                        <input type="text" placeholder="פילטר" name="filter" className="form-control"
                            value={this.state.filter} onChange={this.changeFilterTextHandler} />
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> ID</th>
                                <th> Name</th>
                                <th> Last Name</th>
                                <th> Date</th>
                                <th> Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.map(
                                    customer =>
                                        <tr key={customer.id} onClick={() => this.editCustomer(customer.id)}>
                                            <td>{customer.id}</td>
                                            <td> {customer.name} </td>
                                            <td> {customer.lastName}</td>
                                            <td> {moment(customer.date).utc().format('DD/MM/YYYY')}</td>
                                            <td> {customer.phone}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
