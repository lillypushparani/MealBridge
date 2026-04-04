package com.mealbridge.backend.repository;

import com.mealbridge.backend.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByStatus(String status);

    List<Donation> findByUserId(Long userId);
}