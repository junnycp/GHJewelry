package com.codershop.shoppinganywhere.dao;

import com.codershop.shoppinganywhere.common.generics.GenericDao;
import com.codershop.shoppinganywhere.model.Product;

import java.util.List;

public interface ProductDao extends GenericDao<Product, Integer> {
    List<Product> getAllProduct();
    Product insert(Product product);
    Product update(Product product);
    boolean delete(Long idProduct);
    Product findById(Long idProduct);
    List<Product> finByCategory(String idCategory);
}
