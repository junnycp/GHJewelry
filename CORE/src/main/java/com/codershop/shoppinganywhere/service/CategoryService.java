package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategory();
    List<Category> finByCategory(String idCategory);
    Category insert(Category category);
}
