package com.mealbridge.backend.service;

import com.mealbridge.backend.dto.CreateRequest;
import com.mealbridge.backend.entity.Request;
import com.mealbridge.backend.entity.User;
import com.mealbridge.backend.repository.RequestRepository;
import com.mealbridge.backend.repository.UserRepository;
import com.mealbridge.backend.util.DistanceUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    public Request createRequest(CreateRequest requestDto) {

        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Request request = new Request();

        request.setMealType(requestDto.getMealType());
        request.setQuantity(requestDto.getQuantity());
        request.setLatitude(requestDto.getLatitude());
        request.setLongitude(requestDto.getLongitude());
        request.setAddress(requestDto.getAddress());

        request.setStatus("ACTIVE");
        request.setUser(user);

        return requestRepository.save(request);
    }

    public List<Request> getActiveRequests() {
        return requestRepository.findByStatus("ACTIVE");
    }

    public List<Request> getMyRequests(Long userId) {
        return requestRepository.findByUserId(userId);
    }

    public Request completeRequest(Long id) {

    Request request = requestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Request not found"));

    request.setStatus("COMPLETED");

    return requestRepository.save(request);
    }

    public void deleteRequest(Long id) {
    requestRepository.deleteById(id);
    }

    public List<Request> getNearbyRequests(
        Double latitude,
        Double longitude,
        Double radius) {

    List<Request> active = requestRepository.findByStatus("ACTIVE");

    return active.stream()
            .filter(r -> {

                if (r.getLatitude() == null || r.getLongitude() == null)
                    return false;

                double distance = DistanceUtil.calculateDistance(
                        latitude,
                        longitude,
                        r.getLatitude(),
                        r.getLongitude()
                );

                return distance <= radius;

            })
            .toList();
    }
}