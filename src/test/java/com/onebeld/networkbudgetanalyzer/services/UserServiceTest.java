package com.onebeld.networkbudgetanalyzer.services;

import com.onebeld.networkbudgetanalyzer.entities.User;
import com.onebeld.networkbudgetanalyzer.enums.Role;
import com.onebeld.networkbudgetanalyzer.repositories.UserRepository;
import com.onebeld.networkbudgetanalyzer.services.implementations.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User testUser;
    private final String USERNAME = "testuser";
    private final String EMAIL = "test@example.com";
    private final String PASSWORD = "password123";
    private final String FIRST_NAME = "Test";
    private final String LAST_NAME = "User";

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername(USERNAME);
        testUser.setEmail(EMAIL);
        testUser.setPassword(PASSWORD);
        testUser.setFirstName(FIRST_NAME);
        testUser.setLastName(LAST_NAME);
        testUser.setRole(Role.ROLE_USER);
    }

    @Test
    void save_ShouldReturnSavedUser() {
        // Arrange
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act
        User savedUser = userService.save(testUser);


        // Assert
        assertNotNull(savedUser);
        assertEquals(USERNAME, savedUser.getUsername());
        assertEquals(EMAIL, savedUser.getEmail());
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void create_WithNewUser_ShouldReturnCreatedUser() {
        // Arrange
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act
        User createdUser = userService.create(testUser);

        // Assert
        assertNotNull(createdUser);
        assertEquals(USERNAME, createdUser.getUsername());
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void create_WithExistingUsername_ShouldThrowException() {
        // Arrange
        when(userRepository.existsByUsername(anyString())).thenReturn(true);

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.create(testUser);
        });

        assertEquals("Пользователь с таким именем уже существует", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void create_WithExistingEmail_ShouldThrowException() {
        // Arrange
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.create(testUser);
        });

        assertEquals("Пользователь с таким email уже существует", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void getByUsername_WithExistingUser_ShouldReturnUser() {
        // Arrange
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(testUser));


        // Act
        User foundUser = userService.getByUsername(USERNAME);

        // Assert
        assertNotNull(foundUser);
        assertEquals(USERNAME, foundUser.getUsername());
        verify(userRepository, times(1)).findByUsername(USERNAME);
    }

    @Test
    void getByUsername_WithNonExistingUser_ShouldThrowException() {
        // Arrange
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> {
            userService.getByUsername("nonexistent");
        });
    }

    @Test
    void userDetailsService_ShouldReturnUserDetails() {
        // Arrange
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(testUser));
        var userDetailsService = userService.userDetailsService();

        // Act
        UserDetails userDetails = userDetailsService.loadUserByUsername(USERNAME);

        // Assert
        assertNotNull(userDetails);
        assertEquals(USERNAME, userDetails.getUsername());
        assertEquals(1, userDetails.getAuthorities().size());
    }
}
