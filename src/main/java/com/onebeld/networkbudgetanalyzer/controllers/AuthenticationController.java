package com.onebeld.networkbudgetanalyzer.controllers;

import com.onebeld.networkbudgetanalyzer.dtos.auth.JwtResponse;
import com.onebeld.networkbudgetanalyzer.dtos.auth.LoginRequest;
import com.onebeld.networkbudgetanalyzer.dtos.auth.RegisterRequest;
import com.onebeld.networkbudgetanalyzer.security.jwt.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.signIn(loginRequest);

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        JwtResponse jwtResponse = authService.signUp(signUpRequest);

        return ResponseEntity.ok(jwtResponse);
    }
}
