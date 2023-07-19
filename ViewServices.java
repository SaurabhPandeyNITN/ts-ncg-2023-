package com.example.chartviewer.service;

import com.example.chartviewer.entity.View;
import com.example.chartviewer.repository.ViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ViewService {
    @Autowired
    private ViewRepository viewRepository;

    public View createView(View view) {


        return viewRepository.save(view);
    }

    public List<View> getAllViews() {


        return viewRepository.findAll();
    }

    public Optional<View> getViewById(Long viewId) {


        return viewRepository.findById(viewId);
    }

    public void deleteView(Long viewId) {
        
        viewRepository.deleteById(viewId);
    }

    // You can also implement the updateView() method if needed
}
