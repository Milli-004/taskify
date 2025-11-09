package com.taskify.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    private String userId;
    private String title;
    private String description;
    private boolean completed;
    private Instant dueAt;
    private String status; // todo, in-progress, completed
    private String priority; // high, medium, low
    private String category; // work, personal, urgent, etc.
    private Instant createdAt;
    private Instant updatedAt;

    // Constructor
    public Task() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
        this.priority = "medium"; // default priority
        this.status = "todo"; // default status
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { 
        this.title = title;
        this.updatedAt = Instant.now();
    }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { 
        this.description = description;
        this.updatedAt = Instant.now();
    }
    
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { 
        this.completed = completed;
        this.updatedAt = Instant.now();
    }
    
    public Instant getDueAt() { return dueAt; }
    public void setDueAt(Instant dueAt) { 
        this.dueAt = dueAt;
        this.updatedAt = Instant.now();
    }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { 
        this.status = status;
        this.updatedAt = Instant.now();
    }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { 
        this.priority = priority;
        this.updatedAt = Instant.now();
    }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { 
        this.category = category;
        this.updatedAt = Instant.now();
    }
    
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
