package com.mealbridge.backend.service;

import com.mealbridge.backend.dto.CreateDonationRequest;
import com.mealbridge.backend.entity.Donation;
import com.mealbridge.backend.entity.User;
import com.mealbridge.backend.repository.DonationRepository;
import com.mealbridge.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.mealbridge.backend.util.DistanceUtil;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final UserRepository userRepository;

    public Donation createDonation(CreateDonationRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Donation donation = new Donation();

        donation.setMealType(request.getMealType());
        donation.setQuantity(request.getQuantity());
        donation.setFoodType(request.getFoodType());

        donation.setLatitude(request.getLatitude());
        donation.setLongitude(request.getLongitude());
        donation.setAddress(request.getAddress());

        donation.setStatus("ACTIVE");
        donation.setUser(user);

        return donationRepository.save(donation);
    }

    public List<Donation> getActiveDonations() {
        return donationRepository.findByStatus("ACTIVE");
    }

    public List<Donation> getMyDonations(Long userId) {
        return donationRepository.findByUserId(userId);
    }

    public Donation completeDonation(Long id) {

    Donation donation = donationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donation not found"));

    donation.setStatus("COMPLETED");

    return donationRepository.save(donation);
    }

    public void deleteDonation(Long id) {
    donationRepository.deleteById(id);
    }

    public List<Donation> getNearbyDonations(
        Double latitude,
        Double longitude,
        Double radius) {

        List<Donation> active = donationRepository.findByStatus("ACTIVE");

        return active.stream()
            .filter(d -> {

                if (d.getLatitude() == null || d.getLongitude() == null)
                    return false;

                double distance = DistanceUtil.calculateDistance(
                        latitude,
                        longitude,
                        d.getLatitude(),
                        d.getLongitude()
                );

                return distance <= radius;

            })
            .toList();
    }
}