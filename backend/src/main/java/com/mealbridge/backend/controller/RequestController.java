package com.mealbridge.backend.controller;

import com.mealbridge.backend.dto.CreateRequest;
import com.mealbridge.backend.entity.Request;
import com.mealbridge.backend.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping
    public Request create(@RequestBody CreateRequest request) {
        return requestService.createRequest(request);
    }

    @GetMapping("/active")
    public List<Request> getActive() {
        return requestService.getActiveRequests();
    }

    @GetMapping("/user/{userId}")
    public List<Request> getMy(@PathVariable Long userId) {
        return requestService.getMyRequests(userId);
    }

    @PutMapping("/{id}/complete")
    public Request complete(@PathVariable Long id) {
        return requestService.completeRequest(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        requestService.deleteRequest(id);
    }

    @GetMapping("/nearby")
    public List<Request> nearby(
        @RequestParam Double lat,
        @RequestParam Double lng,
        @RequestParam(defaultValue = "20") Double radius) {

    return requestService.getNearbyRequests(lat, lng, radius);
    }
}