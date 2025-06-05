package com.onebeld.networkbudgetanalyzer.security.jwt;

import com.onebeld.networkbudgetanalyzer.dtos.auth.JwtResponse;
import com.onebeld.networkbudgetanalyzer.dtos.auth.LoginRequest;
import com.onebeld.networkbudgetanalyzer.dtos.auth.RegisterRequest;
import com.onebeld.networkbudgetanalyzer.entities.User;
import com.onebeld.networkbudgetanalyzer.enums.Role;
import com.onebeld.networkbudgetanalyzer.services.implementations.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserServiceImpl userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    /**
     * Регистрация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    public JwtResponse signUp(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .build();

        userService.create(user);

        var jwt = jwtService.generateToken(user);
        return new JwtResponse(jwt, "Bearer", user.getId(), user.getUsername(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getPhone());
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    public JwtResponse signIn(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        User user = (User)userService
                .userDetailsService()
                .loadUserByUsername(request.getUsername());

        String jwt = jwtService.generateToken(user);
        return new JwtResponse(jwt, "Bearer", user.getId(), user.getUsername(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getPhone());
    }
}
