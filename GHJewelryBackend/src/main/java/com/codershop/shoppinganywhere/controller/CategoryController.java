package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.common.utils.ExceptionUtil;
import com.codershop.shoppinganywhere.model.Category;
import com.codershop.shoppinganywhere.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/Categories")
public class CategoryController extends GenericController<Category, Long> {
    @Autowired
    private CategoryService service;

    @Override
    @PreAuthorize("@appAuthorizer.authorize(authentication, 'CREATE', this)")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody @Valid Category category) {
        if (service.isDuplicate(category.getNameCategory(), category.getIdCategory())) {
            throw ExceptionUtil.getDuplicateException();
        }
        return super.create(category);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'UPDATE', this)")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Object> update(@RequestBody @Valid Category category) {
        if (service.isDuplicate(category.getNameCategory(), category.getIdCategory())) {
            throw ExceptionUtil.getDuplicateException();
        }
        return super.update(category);
    }
}
