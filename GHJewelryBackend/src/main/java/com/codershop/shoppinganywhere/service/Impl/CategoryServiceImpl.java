package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryServiceImpl;
import com.codershop.shoppinganywhere.dao.repo.CategoryRepo;
import com.codershop.shoppinganywhere.model.Category;
import com.codershop.shoppinganywhere.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl extends ComplexQueryServiceImpl<Category, Long> implements CategoryService {

    @Autowired
    private CategoryRepo repo;

    @Override
    public boolean isDuplicate(String nameCategory, Long idCategory) {
        return repo.countCategory(nameCategory, idCategory) > 0;
    }
}
