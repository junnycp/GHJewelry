package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.dao.CategoryDao;
import com.codershop.shoppinganywhere.model.Category;
import com.codershop.shoppinganywhere.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("CategoryServiceImpl")
@Transactional
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryDao categoryDao;

    @Override
    public List<Category> getAllCategory() {
        return categoryDao.getAllCategory();
    }

    @Override
    public List<Category> finByCategory(String idCategory) {
        return categoryDao.finByCategory(idCategory);
    }

    @Override
    public Category insert(Category category) {
        return categoryDao.insert(category);
    }
}
