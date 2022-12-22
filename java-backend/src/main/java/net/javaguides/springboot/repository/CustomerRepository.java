package net.javaguides.springboot.repository;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import net.javaguides.springboot.model.Customer;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Repository
public class CustomerRepository {
    private static final String SAMPLE_CSV_FILE_PATH = "./customers.csv";

    List<Customer> customerList = new ArrayList<>();

    @Scheduled(fixedDelay = 3000)
    public void reloadCustomers() {
        try {
            Reader reader = Files.newBufferedReader(Paths.get(SAMPLE_CSV_FILE_PATH));
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT);
            for (CSVRecord csvRecord : csvParser) {
                Integer id = Integer.parseInt(csvRecord.get(0));
                String name = csvRecord.get(1);
                String lastName = csvRecord.get(2);
                Date date = new SimpleDateFormat("dd/MM/yyyy").parse(csvRecord.get(3));
                String phone = csvRecord.get(4);
                String bankAccount = csvRecord.get(5);
                customerList.add(new Customer(id, name, lastName, date, phone, bankAccount));
            }
        }  catch (ParseException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Customer> getAll() {
        if (customerList.size() == 0)
            reloadCustomers();
        return customerList;
    }

    public Customer getCustomerById(Long id) {
        return customerList.stream().filter(c -> c.getId() == id).findFirst().orElseThrow(() -> new ResourceNotFoundException("Customer not exist with id :" + id));
    }

    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = getCustomerById(id);
        customer.setName(customerDetails.getName());
        customer.setLastName(customerDetails.getLastName());
        customer.setBankAccount(customerDetails.getBankAccount());
        saveCustomer();
        return customer;
    }

    public void saveCustomer() {
        try (
                BufferedWriter writer = Files.newBufferedWriter(Paths.get(SAMPLE_CSV_FILE_PATH));
                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT);
        ) {
            for (Customer customer : customerList) {
                csvPrinter.printRecord(customer.getId(), customer.getName(), customer.getLastName(), customer.getDate(), customer.getPhone(), customer.getBankAccount());
            }
            csvPrinter.flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        reloadCustomers();
    }

    public static void main(String[] args) {
        CustomerRepository s = new CustomerRepository();
    }
}


