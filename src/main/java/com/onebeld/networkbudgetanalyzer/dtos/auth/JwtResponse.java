package com.onebeld.networkbudgetanalyzer.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
}
