package com.taskify.controller;

import com.taskify.model.Task;
import com.taskify.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/user/{userId}")
    public List<Task> getByUser(@PathVariable String userId){
        return taskRepository.findByUserId(userId);
    }

    @PostMapping
    public Task create(@RequestBody Task t){
        return taskRepository.save(t);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable String id, @RequestBody Task t){
        var opt = taskRepository.findById(id);
        if(opt.isEmpty()) return ResponseEntity.notFound().build();
        Task existing = opt.get();
        existing.setTitle(t.getTitle());
        existing.setDescription(t.getDescription());
        existing.setCompleted(t.isCompleted());
        existing.setStatus(t.getStatus());
        existing.setDueAt(t.getDueAt());
        taskRepository.save(existing);
        return ResponseEntity.ok(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        taskRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
