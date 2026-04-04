package com.mealbridge.backend.dto;

import lombok.Data;

@Data
public class CreateDonationRequest {

    private String mealType;
    private Integer quantity;
    private String foodType;

    private Double latitude;
    private Double longitude;
    private String address;

    private Long userId;
}