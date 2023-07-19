package com.example.chartviewer.controller;

import com.example.chartviewer.entity.View;
import com.example.chartviewer.service.ViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/view")
public class ViewController {
    @Autowired
    private ViewService viewService;

    @PostMapping
    public ResponseEntity<View> createView(@RequestBody View view) {
        View createdView = viewService.createView(view);
        return new ResponseEntity<>(createdView, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<View>> getAllViews() {
        List<View> views = viewService.getAllViews();
        return new ResponseEntity<>(views, HttpStatus.OK);
    }

    @GetMapping("/{viewId}")
    public ResponseEntity<View> getViewById(@PathVariable Long viewId) {
        Optional<View> view = viewService.getViewById(viewId);
        return view.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{viewId}")
    public ResponseEntity<Void> deleteView(@PathVariable Long viewId) {
        viewService.deleteView(viewId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
