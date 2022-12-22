import React, { Component } from 'react'
import CustomerService from '../services/CustomerService';

class LoginCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            emailValid: true,
            passwordValid: true,
            firstNameValid: true,
            lastNameValid: true
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.isExitingCustomer = this.isExitingCustomer.bind(this);
    }
    EMAIL_VALIDATION = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    PASSWORD_VALIDATION = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    isExitingCustomer = (e) => {
        e.preventDefault();
        let customer = { name: this.state.name, lastName: this.state.lastName, email: this.state.email, password: this.state.password };
        if (this.EMAIL_VALIDATION.test(customer.email) && this.PASSWORD_VALIDATION.test(customer.password)) {
            CustomerService.isExitingCustomer(customer).then(res => {
                if (res.data)
                    this.props.history.push('/customers');
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
        this.setState({ emailValid: this.EMAIL_VALIDATION.test(event.target.value) });
    }

    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
        this.setState({ passwordValid: this.PASSWORD_VALIDATION.test(event.target.value) });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <div className="card-body">
                                <form onSubmit={this.isExitingCustomer}>
                                    <div className="form-group">
                                        <input style={{ border: !this.state.emailValid ? "1px solid red" : "1px solid #495057" }} placeholder="מייל" type="email" id="email" name="email" className="form-control"
                                            value={this.state.email} onChange={this.changeEmailHandler} required />
                                    </div>
                                    <div className="form-group">
                                        <input style={{ border: "1px solid black" }} type="text" placeholder="שם פרטי" name="firstName" className="form-control" pattern="[A-Za-z]+"
                                            value={this.state.name} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <input style={{ border: "1px solid black" }} placeholder="שם משפחה" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <input style={{ border: !this.state.passwordValid ? "1px solid red" : "1px solid black" }} placeholder="סיסמא" type="password" id="password" name="password" className="form-control" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                            value={this.state.password} onChange={this.changePasswordHandler} required />
                                    </div>
                                    <button className="btn btn-success">כניסה</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginCustomerComponent
