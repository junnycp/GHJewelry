package com.codershop.shoppinganywhere.service.Impl;


import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryServiceImpl;
import com.codershop.shoppinganywhere.dao.repo.ProductRepo;
import com.codershop.shoppinganywhere.model.Product;
import com.codershop.shoppinganywhere.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends ComplexQueryServiceImpl<Product, Long> implements ProductService {
    @Autowired
    private ProductRepo repo;

    @Override
    public boolean isDuplicate(String nameProduct, Long idProduct) {
        return repo.countProduct(nameProduct, idProduct) > 0;
    }
}
