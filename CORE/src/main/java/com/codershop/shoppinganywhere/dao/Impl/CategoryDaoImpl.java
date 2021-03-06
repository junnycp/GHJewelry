package com.codershop.shoppinganywhere.dao.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.GenericDaoImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.CategoryDao;
import com.codershop.shoppinganywhere.dao.repo.CategoryRepo;
import com.codershop.shoppinganywhere.model.Category;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CategoryDaoImpl extends GenericDaoImpl<Category, Integer> implements CategoryDao {
    private final EntityManager em;
    private CategoryRepo categoryRepo;

    public CategoryDaoImpl(EntityManager em, CategoryRepo categoryRepo) {
        this.em = em;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<Category> getAllCategory() {
        return categoryRepo.getAllCategory();
    }

    @Override
    public List<Category> finByCategory(String idCategory) {
        String sql = "SELECT  c.id_category, c.name FROM categories c where c.id_category= '" + idCategory + "' ORDER BY c.id_category asc";
        List<Category> categorieList = new ArrayList<>();
        Query query = em.createNativeQuery(sql, Tuple.class);
        List<Tuple> lstResult = query.getResultList();
        if (!ValidationUtil.isNullOrEmpty(lstResult)) {
            for (Tuple tuple : lstResult) {
                Category category = new Category();
                category.setIdCategory(tuple.get("id_category", String.class));
                category.setNameCategory(tuple.get("name", String.class));
                categorieList.add(category);
            }
        }
        return categorieList;
    }

    @Override
    public Category insert(Category category) {
        category = save(category);
        return category;
    }
}

