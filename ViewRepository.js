package com.example.chartviewer.repository;

import com.example.chartviewer.entity.View;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewRepository extends JpaRepository<View, Long> {
    // Custom methods (if any)
}
