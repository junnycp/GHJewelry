package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.common.generics.ComplexQueryService;
import com.codershop.shoppinganywhere.model.Category;

public interface CategoryService extends ComplexQueryService<Category, Long> {
    boolean isDuplicate(String nameCategory, Long idCategory);
}
