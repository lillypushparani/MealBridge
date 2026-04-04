package com.mealbridge.backend.dto;

import lombok.Data;

@Data
public class CreateRequest {

    private String mealType;
    private Integer quantity;

    private Double latitude;
    private Double longitude;
    private String address;

    private Long userId;
}