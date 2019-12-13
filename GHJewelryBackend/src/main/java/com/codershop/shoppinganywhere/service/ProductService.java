package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.common.generics.ComplexQueryService;
import com.codershop.shoppinganywhere.model.Product;


public interface ProductService extends ComplexQueryService<Product,Long> {
    boolean isDuplicate(String nameProduct, Long idProduct);
}
