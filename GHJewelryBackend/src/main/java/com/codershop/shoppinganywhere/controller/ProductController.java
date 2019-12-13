package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.common.utils.ExceptionUtil;
import com.codershop.shoppinganywhere.model.Product;
import com.codershop.shoppinganywhere.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/Products")
public class ProductController extends GenericController<Product, Long> {

    @Autowired
    private ProductService service;

    @Override
    @PreAuthorize("@appAuthorizer.authorize(authentication, 'CREATE', this)")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody @Valid Product product) {
        if (service.isDuplicate(product.getNameProduct(), product.getIdProduct())) {
            throw ExceptionUtil.getDuplicateException();
        }
        return super.create(product);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'UPDATE', this)")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Object> update(@RequestBody @Valid Product product) {
        if (service.isDuplicate(product.getNameProduct(), product.getIdProduct())) {
            throw ExceptionUtil.getDuplicateException();
        }
        return super.update(product);
    }
}
