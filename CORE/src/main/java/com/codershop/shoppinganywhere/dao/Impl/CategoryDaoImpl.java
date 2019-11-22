package com.codershop.shoppinganywhere.dao.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.GenericDaoImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.CategoryDao;
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

    public CategoryDaoImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Category> getAllCategory() {
        String sql = "select *from categories";
        return (List<Category>) em.createNativeQuery(sql).getResultList();
    }

    @Override
    public List<Category> finByCategory(String idCategory) {
        String sql = "SELECT  c.id_category, c.id_product, c.name FROM categories c where c.id_category= '" + idCategory + "' ORDER BY c.id_product asc";
        List<Category> categorieList = new ArrayList<>();
        Query query = em.createNativeQuery(sql, Tuple.class);
        List<Tuple> lstResult = query.getResultList();
        if (!ValidationUtil.isNullOrEmpty(lstResult)) {
            for (Tuple tuple : lstResult) {
                Integer idProduct = tuple.get("id_product", Integer.class);
                Category category = new Category();
                category.setIdCategory(tuple.get("id_category", String.class));
                category.setIdProduct(!ValidationUtil.isNull(idProduct) ? idProduct.longValue() : null);
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

