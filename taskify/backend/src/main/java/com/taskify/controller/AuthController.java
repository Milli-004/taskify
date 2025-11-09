package com.taskify.controller;

import com.taskify.model.User;
import com.taskify.repository.UserRepository;
import com.taskify.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User u){
        // Validate input
        if(u.getUsername() == null || u.getUsername().trim().isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("message", "username_required"));
        }
        if(u.getPassword() == null || u.getPassword().length() < 6){
            return ResponseEntity.badRequest().body(Map.of("message", "password_too_short"));
        }
        
        // Check if username exists
        if(userRepository.findByUsername(u.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body(Map.of("message","username_taken"));
        }
        
        // Hash password before saving
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        User saved = userRepository.save(u);
        
        String token = jwtUtil.generateToken(u.getUsername());
        return ResponseEntity.ok(Map.of(
            "token", token,
            "username", saved.getUsername(),
            "userId", saved.getId(),  // ✅ Return database ID
            "message", "registration_success"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User u){
        // Validate input
        if(u.getUsername() == null || u.getPassword() == null){
            return ResponseEntity.badRequest().body(Map.of("message", "invalid_input"));
        }
        
        var opt = userRepository.findByUsername(u.getUsername());
        
        // Check if user exists and password matches
        if(opt.isEmpty() || !passwordEncoder.matches(u.getPassword(), opt.get().getPassword())){
            return ResponseEntity.status(401).body(Map.of("message","invalid_credentials"));
        }
        
        User user = opt.get();
        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok(Map.of(
            "token", token, 
            "username", user.getUsername(),
            "userId", user.getId(),  // ✅ Return database ID
            "message", "login_success"
        ));
    }
    
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader(value = "Authorization", required = false) String authHeader){
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return ResponseEntity.status(401).body(Map.of("message", "no_token"));
        }
        
        try {
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            return ResponseEntity.ok(Map.of("username", username, "valid", true));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "invalid_token"));
        }
    }
}
