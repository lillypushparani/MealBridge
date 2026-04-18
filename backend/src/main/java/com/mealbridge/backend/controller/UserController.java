package com.mealbridge.backend.controller;

import com.mealbridge.backend.dto.UpdateUserRequest;
import com.mealbridge.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.mealbridge.backend.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
                           @RequestBody UpdateUserRequest request) {
        return userService.updateUser(id, request);
    }

    @GetMapping("/{id}")
public User getUser(@PathVariable Long id) {
    return userService.getUserById(id);
    }

    @GetMapping("/phone/{phone}")
public User getUserByPhone(@PathVariable String phone) {
    return userService.getUserByPhone(phone);
    }

    
}