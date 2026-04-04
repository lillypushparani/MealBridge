package com.mealbridge.backend.scheduler;

import com.mealbridge.backend.entity.Donation;
import com.mealbridge.backend.entity.Request;
import com.mealbridge.backend.repository.DonationRepository;
import com.mealbridge.backend.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ExpiryScheduler {

    private final DonationRepository donationRepository;
    private final RequestRepository requestRepository;

    @Scheduled(fixedRate = 900000) // 15 mins
    public void expirePosts() {

        LocalDateTime fourHoursAgo = LocalDateTime.now().minusHours(4);

        List<Donation> donations = donationRepository.findByStatus("ACTIVE");
        donations.stream()
                .filter(d -> d.getCreatedAt().isBefore(fourHoursAgo))
                .forEach(d -> {
                    d.setStatus("EXPIRED");
                    donationRepository.save(d);
                });

        List<Request> requests = requestRepository.findByStatus("ACTIVE");
        requests.stream()
                .filter(r -> r.getCreatedAt().isBefore(fourHoursAgo))
                .forEach(r -> {
                    r.setStatus("EXPIRED");
                    requestRepository.save(r);
                });
    }
}