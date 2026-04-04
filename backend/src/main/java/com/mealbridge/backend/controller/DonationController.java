package com.mealbridge.backend.controller;

import com.mealbridge.backend.dto.CreateDonationRequest;
import com.mealbridge.backend.entity.Donation;
import com.mealbridge.backend.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public Donation create(@RequestBody CreateDonationRequest request) {
        return donationService.createDonation(request);
    }

    @GetMapping("/active")
    public List<Donation> getActive() {
        return donationService.getActiveDonations();
    }

    @GetMapping("/user/{userId}")
    public List<Donation> getMy(@PathVariable Long userId) {
        return donationService.getMyDonations(userId);
    }

    @PutMapping("/{id}/complete")
    public Donation complete(@PathVariable Long id) {
        return donationService.completeDonation(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        donationService.deleteDonation(id);
    }

    @GetMapping("/nearby")
    public List<Donation> nearby(
        @RequestParam Double lat,
        @RequestParam Double lng,
        @RequestParam(defaultValue = "20") Double radius) {

    return donationService.getNearbyDonations(lat, lng, radius);
    }
}