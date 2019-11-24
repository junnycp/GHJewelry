package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.model.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryRepo extends CrudRepository<Category,Integer> {
    @Query(value = "SELECT * FROM categories", nativeQuery = true)
    List<Category> getAllCategory();
}
