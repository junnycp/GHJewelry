package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepo extends CrudRepository<Category,Integer> {
}
