package net.javaguides.springboot.controller;

import com.sun.org.apache.xpath.internal.operations.Bool;
import net.javaguides.springboot.model.Customer;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/api-logIn")
    public ResponseEntity<Boolean> logIn(@RequestBody User user) {
        Boolean isExistsUser = userRepository.isExistsUser(user);
        return new ResponseEntity<>(isExistsUser, HttpStatus.OK);
    }
}


