package com.taskify.controller;

import com.taskify.model.User;
import com.taskify.repository.UserRepository;
import com.taskify.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User u){
        if(userRepository.findByUsername(u.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body(Map.of("message","username_taken"));
        }
        userRepository.save(u);
        String token = jwtUtil.generateToken(u.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User u){
        var opt = userRepository.findByUsername(u.getUsername());
        if(opt.isEmpty() || !opt.get().getPassword().equals(u.getPassword())){
            return ResponseEntity.status(401).body(Map.of("message","invalid_credentials"));
        }
        String token = jwtUtil.generateToken(u.getUsername());
        return ResponseEntity.ok(Map.of("token", token, "username", u.getUsername()));
    }
}
