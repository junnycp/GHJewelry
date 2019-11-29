package com.codershop.shoppinganywhere.dao.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.GenericDaoImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.ProductDao;
import com.codershop.shoppinganywhere.dao.repo.ProductRepo;
import com.codershop.shoppinganywhere.model.Product;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.Tuple;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductDaoImpl extends GenericDaoImpl<Product, Integer> implements ProductDao {
    private final EntityManager em;
    private final ProductRepo productRepo;
    public ProductDaoImpl(EntityManager em,ProductRepo productRepo) {
        this.em = em;
        this.productRepo = productRepo;
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepo.getAllProduct();
    }

    @Override
    public Product insert(Product product) {
        product = save(product);
        return product;
    }

    @Override
    public Product update(Product product) {
        String sql = "UPDATE products p SET p.id_category=:idCategory, p.name=:nameProduct, p.size=:size, p.price=:price, p.note=:note, p.image= :image" +
                " WHERE p.id_product=:idProduct";
        Query query = em.createNativeQuery(sql);
        query.setParameter("idCategory", product.getIdCategory());
        query.setParameter("nameProduct", product.getNameProduct());
        query.setParameter("size", product.getSize());
        query.setParameter("price", product.getPrice());
        query.setParameter("note", product.getNote());
        query.setParameter("image", product.getImage());
        query.setParameter("idProduct", product.getIdProduct());
        query.executeUpdate();
        return product;
    }

    @Override
    public boolean delete(Long idProduct) {
        String sql = "DELETE FROM products WHERE id_product= :idProduct";
        em.createNativeQuery(sql).setParameter("idProduct", idProduct).executeUpdate();
        return true;
    }

    @Override
    public Product findById(Long idProduct) {
        Product product = findBy(idProduct);
        return product;
    }

    @Override
    public List<Product> finByCategory(String idCategory) {
        String sql = "SELECT p.id_product, p.id_category, p.name, p.price FROM products p where p.id_category= '" + idCategory + "' ORDER BY p.id_product asc";
        List<Product> productList = new ArrayList<>();
        Query query = em.createNativeQuery(sql, Tuple.class);
        List<Tuple> lstResult = query.getResultList();
        if (!ValidationUtil.isNullOrEmpty(lstResult)) {
            for (Tuple tuple : lstResult) {
                Integer idProduct = tuple.get("id_product", Integer.class);
                BigDecimal priceProduct = tuple.get("price", BigDecimal.class);
                Product product = new Product();
                product.setIdProduct(!ValidationUtil.isNull(idProduct) ? idProduct.longValue() :  null);
                product.setIdCategory(tuple.get("id_category", String.class));
                product.setNameProduct(tuple.get("name", String.class));
                product.setPrice(!ValidationUtil.isNull(priceProduct)?  priceProduct.toString() : null);
                productList.add(product);
            }
        }
        return productList;
    }
}
