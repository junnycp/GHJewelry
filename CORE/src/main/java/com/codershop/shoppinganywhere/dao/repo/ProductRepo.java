package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product,Integer> {
}
