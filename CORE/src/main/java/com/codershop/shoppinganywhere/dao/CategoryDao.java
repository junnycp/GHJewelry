package com.codershop.shoppinganywhere.dao;

import com.codershop.shoppinganywhere.common.generics.GenericDao;
import com.codershop.shoppinganywhere.model.Category;

import java.util.List;

public interface CategoryDao extends GenericDao<Category, Integer> {
    List<Category> getAllCategory();
    List<Category> finByCategory(String idCategory);
    Category insert(Category category);
}
