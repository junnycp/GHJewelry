package com.codershop.shoppinganywhere.dao.repo.ext.impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryRepositoryImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.repo.ext.CategoryRepoExt;
import com.codershop.shoppinganywhere.model.Category;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
public class CategoryRepoExtImpl extends ComplexQueryRepositoryImpl<Category> implements CategoryRepoExt {
    private final EntityManager em;

    @Autowired
    public CategoryRepoExtImpl(EntityManager em) {
        super(Category.class);
        this.em = em;
    }

    @Override
    protected Predicate[] getWhereCondition(CriteriaBuilder cb, Root<Category> rootEntity, Category example) {
        List<Predicate> predicates = new ArrayList<>();
        if (!ValidationUtil.isNull(example)) {
            if (!ValidationUtil.isNullOrEmpty(example.getNameCategory())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("nameCategory")),
                        "%" + example.getNameCategory().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }
        }
        return predicates.toArray(new Predicate[]{});
    }

    @Override
    protected EntityManager getEntityManager() {
        return this.em;
    }
}
