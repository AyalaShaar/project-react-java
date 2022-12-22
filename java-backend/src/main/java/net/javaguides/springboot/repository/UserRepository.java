package net.javaguides.springboot.repository;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Customer;
import net.javaguides.springboot.model.User;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class UserRepository {

    private static final String SAMPLE_CSV_FILE_PATH = "./users.csv";
    List<User> usersList = new ArrayList<>();

    public void loadUsers() {
        try {
            Reader reader = Files.newBufferedReader(Paths.get(SAMPLE_CSV_FILE_PATH));
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT);
            for (CSVRecord csvRecord : csvParser) {
                Integer id = Integer.parseInt(csvRecord.get(0));
                String name = csvRecord.get(1);
                String lastName = csvRecord.get(2);
                String email = csvRecord.get(3);
                String password = csvRecord.get(4);
                usersList.add(new User(id, name, lastName, email, password));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean isExistsUser(User user) {
        if (usersList.size() == 0) {
            loadUsers();
        }
        User loggedUser = usersList.stream().filter(u ->
                u.getEmail().trim().equals(user.getEmail().trim()) &&
                u.getPassword().trim().equals(user.getPassword().trim()))
                .findFirst().orElse(null);
        return loggedUser != null;
    }
}
