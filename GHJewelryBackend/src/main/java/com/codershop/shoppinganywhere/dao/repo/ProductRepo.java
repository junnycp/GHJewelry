package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.dao.repo.ext.ProductRepoExt;
import com.codershop.shoppinganywhere.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>, ProductRepoExt {
    @Query(value = "SELECT COUNT(*) FROM products WHERE name = :nameProduct AND (:idProduct IS NULL OR id_product != :idProduct)", nativeQuery = true)
    int countProduct(@Param("nameProduct") String nameProduct, @Param("idProduct") Long idProduct);
}
