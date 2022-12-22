import React, { Component } from 'react'
import CustomerService from '../services/CustomerService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            lastName: '',
            bankAccount: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeBankAccountHandler = this.changeBankAccountHandler.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
    }

    componentDidMount(){
        CustomerService.getCustomerById(this.state.id).then( (res) =>{
                let customer = res.data;
                this.setState({name: customer.name,
                    lastName: customer.lastName,
                    bankAccount: customer.bankAccount
                });
            });       
    }
    updateCustomer = (e) => {
        e.preventDefault();
        let customer = {name: this.state.name, lastName: this.state.lastName, bankAccount: this.state.bankAccount};
        CustomerService.updateCustomer(customer, this.state.id).then( res => {
            this.props.history.push('/customers');
            window.location.href = '/customers';
            });
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeBankAccountHandler= (event) => {
        this.setState({bankAccount: event.target.value});
    }

    backButton(){
        this.props.history.push('/customers');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <input placeholder="שם פרטי" name="firstName" className="form-control" 
                                                value={this.state.name} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="שם משפחה" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="Bank Account" name="bankAccount" className="form-control" 
                                                value={this.state.bankAccount} onChange={this.changeBankAccountHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.updateCustomer}>שמירה</button>
                                        <button className="btn btn-danger" onClick={this.backButton.bind(this)} style={{marginLeft: "10px"}}>חזרה</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
