package com.taskify.controller;

import com.taskify.model.Task;
import com.taskify.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    private String getAuthenticatedUsername(Authentication auth) {
        return auth.getName();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getByUser(@PathVariable String userId, Authentication auth){
        try {
            String authenticatedUser = getAuthenticatedUsername(auth);
            
            // ✅ FIXED: userId in URL is username from frontend
            if (!authenticatedUser.equals(userId)) {
                return ResponseEntity.status(403).build();
            }
            
            List<Task> tasks = taskRepository.findByUserId(userId);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{userId}/filter")
    public ResponseEntity<List<Task>> filterTasks(
            @PathVariable String userId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            Authentication auth
    ){
        try {
            String authenticatedUser = getAuthenticatedUsername(auth);
            
            if (!authenticatedUser.equals(userId)) {
                return ResponseEntity.status(403).build();
            }
            
            List<Task> tasks = taskRepository.findByUserId(userId);
            
            if(status != null && !status.isEmpty()){
                tasks = tasks.stream()
                        .filter(t -> status.equals(t.getStatus()))
                        .collect(Collectors.toList());
            }
            
            if(priority != null && !priority.isEmpty()){
                tasks = tasks.stream()
                        .filter(t -> priority.equals(t.getPriority()))
                        .collect(Collectors.toList());
            }
            
            if(category != null && !category.isEmpty()){
                tasks = tasks.stream()
                        .filter(t -> category.equals(t.getCategory()))
                        .collect(Collectors.toList());
            }
            
            if(search != null && !search.isEmpty()){
                String searchLower = search.toLowerCase();
                tasks = tasks.stream()
                        .filter(t -> 
                            (t.getTitle() != null && t.getTitle().toLowerCase().contains(searchLower)) ||
                            (t.getDescription() != null && t.getDescription().toLowerCase().contains(searchLower))
                        )
                        .collect(Collectors.toList());
            }
            
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task t, Authentication auth){
        try {
            String authenticatedUser = getAuthenticatedUsername(auth);
            
            // ✅ Set userId to authenticated username
            t.setUserId(authenticatedUser);
            
            if(t.getTitle() == null || t.getTitle().trim().isEmpty()){
                return ResponseEntity.badRequest().build();
            }
            
            if(t.getPriority() == null) t.setPriority("medium");
            if(t.getStatus() == null) t.setStatus("todo");
            
            Task saved = taskRepository.save(t);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable String id, @RequestBody Task t, Authentication auth){
        try {
            String authenticatedUser = getAuthenticatedUsername(auth);
            
            var opt = taskRepository.findById(id);
            if(opt.isEmpty()) return ResponseEntity.notFound().build();
            
            Task existing = opt.get();
            
            // ✅ Check if task belongs to authenticated user
            if (!authenticatedUser.equals(existing.getUserId())) {
                return ResponseEntity.status(403).build();
            }
            
            if(t.getTitle() != null) existing.setTitle(t.getTitle());
            if(t.getDescription() != null) existing.setDescription(t.getDescription());
            existing.setCompleted(t.isCompleted());
            if(t.getStatus() != null) existing.setStatus(t.getStatus());
            if(t.getPriority() != null) existing.setPriority(t.getPriority());
            if(t.getCategory() != null) existing.setCategory(t.getCategory());
            if(t.getDueAt() != null) existing.setDueAt(t.getDueAt());
            
            Task saved = taskRepository.save(existing);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id, Authentication auth){
        try {
            String authenticatedUser = getAuthenticatedUsername(auth);
            
            var opt = taskRepository.findById(id);
            if(opt.isEmpty()) return ResponseEntity.notFound().build();
            
            Task existing = opt.get();
            
            if (!authenticatedUser.equals(existing.getUserId())) {
                return ResponseEntity.status(403).build();
            }
            
            taskRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/stats/{userId}")
    public ResponseEntity<?> getStats(@PathVariable String userId, Authentication auth){
        try {
            String authenticatedUser = getAuthenticatedUsername(auth);
            
            if (!authenticatedUser.equals(userId)) {
                return ResponseEntity.status(403).build();
            }
            
            List<Task> tasks = taskRepository.findByUserId(userId);
            
            long total = tasks.size();
            long completed = tasks.stream().filter(Task::isCompleted).count();
            long inProgress = tasks.stream().filter(t -> "in-progress".equals(t.getStatus())).count();
            long todo = tasks.stream().filter(t -> "todo".equals(t.getStatus())).count();
            
            long high = tasks.stream().filter(t -> "high".equals(t.getPriority())).count();
            long medium = tasks.stream().filter(t -> "medium".equals(t.getPriority())).count();
            long low = tasks.stream().filter(t -> "low".equals(t.getPriority())).count();
            
            return ResponseEntity.ok(java.util.Map.of(
                "total", total,
                "completed", completed,
                "inProgress", inProgress,
                "todo", todo,
                "high", high,
                "medium", medium,
                "low", low
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
