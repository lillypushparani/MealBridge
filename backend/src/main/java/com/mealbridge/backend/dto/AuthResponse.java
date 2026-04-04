package com.mealbridge.backend.dto;

import com.mealbridge.backend.entity.User;
import lombok.Data;

@Data
public class AuthResponse {

    private boolean registered;
    private User user;
}