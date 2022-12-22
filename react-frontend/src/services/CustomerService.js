import axios from 'axios';

const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/customers";
const CUSTOMER_API_LOGIN = "http://localhost:8080/api-logIn";

class CustomerService {

    getEmployees(){
        return axios.get(CUSTOMER_API_BASE_URL);
    }

    getCustomerById(customerId){
        return axios.get(CUSTOMER_API_BASE_URL + '/' + customerId);
    }

    updateCustomer(customer, customerId){
        return axios.put(CUSTOMER_API_BASE_URL + '/' + customerId, customer);
    }

    isExitingCustomer(customer){
        return axios.post(CUSTOMER_API_LOGIN, customer);
    }
}

export default new CustomerService()