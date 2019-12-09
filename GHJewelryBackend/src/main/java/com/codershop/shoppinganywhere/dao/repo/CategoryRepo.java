package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.dao.repo.ext.CategoryRepoExt;
import com.codershop.shoppinganywhere.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long>, CategoryRepoExt {
    @Query(value = "SELECT COUNT(*) FROM categories where name = :nameCategory AND (:idCategory IS NULL OR id_category != :idCategory)", nativeQuery = true)
    int countCategory(@Param("nameCategory") String nameCategory, @Param("idCategory") Long idCategory);
}
