package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepo extends CrudRepository<Product,Integer> {
    @Query(value = "SELECT * FROM products", nativeQuery = true)
    List<Product> getAllProduct();
}
