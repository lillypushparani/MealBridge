package com.mealbridge.backend.controller;

import com.mealbridge.backend.dto.AuthRequest;
import com.mealbridge.backend.dto.AuthResponse;
import com.mealbridge.backend.dto.RegisterRequest;
import com.mealbridge.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.mealbridge.backend.service.UserService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/check-user")
    public AuthResponse checkUser(@RequestBody AuthRequest request) {
        return userService.checkUser(request.getPhone());
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }
}