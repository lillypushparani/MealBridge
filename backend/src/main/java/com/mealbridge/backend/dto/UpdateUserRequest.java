package com.mealbridge.backend.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {

    private String name;
    private String organizationName;

    private Double latitude;
    private Double longitude;

    private String address;
}