package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.dao.ProductDao;
import com.codershop.shoppinganywhere.model.Product;
import com.codershop.shoppinganywhere.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("ProductServiceImpl")
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductDao productDao;

    @Override
    public List<Product> getAllProduct() {
        return productDao.getAllProduct();
    }

    @Override
    public Product insert(Product product) {
        return productDao.insert(product);
    }

    @Override
    public Product update(Product product) {
        return productDao.update(product);
    }

    @Override
    public boolean delete(Long idProduct) {
        return productDao.delete(idProduct);
    }

    @Override
    public Product findById(Long idProduct) {
        return productDao.findById(idProduct);
    }

    @Override
    public List<Product> finByCategory(String idCategory) {
        return productDao.finByCategory(idCategory);
    }
}
