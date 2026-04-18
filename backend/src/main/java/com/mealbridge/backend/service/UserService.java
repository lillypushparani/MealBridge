package com.mealbridge.backend.service;

import com.mealbridge.backend.dto.RegisterRequest;
import com.mealbridge.backend.dto.UpdateUserRequest;
import com.mealbridge.backend.entity.User;
import com.mealbridge.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Long checkUser(String phone) {
        Optional<User> user = userRepository.findByPhone(phone);
        if(user.isPresent()) {
            return user.get().getId();
        }
        return 0L;
    }

    public User register(RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        user.setOrganizationName(request.getOrganizationName());
        user.setLatitude(request.getLatitude());
        user.setLongitude(request.getLongitude());
        user.setAddress(request.getAddress());

        return userRepository.save(user);
    }

    public User updateUser(Long id, UpdateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(request.getName());
        user.setOrganizationName(request.getOrganizationName());
        user.setLatitude(request.getLatitude());
        user.setLongitude(request.getLongitude());
        user.setAddress(request.getAddress());

        return userRepository.save(user);
    }

    public User getUserById(Long id) {
    return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public User getUserByPhone(String phone) {
    return userRepository.findByPhone(phone)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

}