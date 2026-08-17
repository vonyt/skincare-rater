package com.example.skincareapi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkincareRepository extends JpaRepository<Skincare, String>{
    
}
