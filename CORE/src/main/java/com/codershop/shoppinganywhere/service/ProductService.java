package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProduct();
    Product insert(Product product);
    Product update(Product product);
    boolean delete(Long idProduct);
    Product findById(Long idProduct);
    List<Product> finByCategory(String idCategory);
}
