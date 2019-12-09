package com.codershop.shoppinganywhere.dao.repo.ext.impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryRepositoryImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.repo.ext.ProductRepoExt;
import com.codershop.shoppinganywhere.model.Product;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
public class ProductRepoExtImpl extends ComplexQueryRepositoryImpl<Product> implements ProductRepoExt {
    private final EntityManager em;

    @Autowired
    public ProductRepoExtImpl(EntityManager em) {
        super(Product.class);
        this.em = em;
    }

    @Override
    protected Predicate[] getWhereCondition(CriteriaBuilder cb, Root<Product> rootEntity, Product example) {
        List<Predicate> predicates = new ArrayList<>();

        if (!ValidationUtil.isNull(example)) {
            if (!ValidationUtil.isNullOrEmpty(example.getNameProduct())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("nameProduct")),
                        "%" + example.getNameProduct().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNullOrEmpty(example.getPrice())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("nameProduct")),
                        "%" + example.getNameProduct().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNull(example.getIdCategory())) {
                predicates.add(cb.equal(rootEntity.get("idCategory"), example.getIdCategory()));
            }

            if (!ValidationUtil.isNull(example.getCreatedTime())) {
                predicates.add(cb.equal(rootEntity.get("createdTime"), example.getCreatedTime()));
            }

            if (!ValidationUtil.isNull(example.getSize())) {
                predicates.add(cb.equal(rootEntity.get("size"), example.getSize()));
            }

            if (!ValidationUtil.isNull(example.getStatus())) {
                predicates.add(cb.equal(rootEntity.get("status"), example.getStatus()));
            }
        }
        return predicates.toArray(new Predicate[]{});

    }

    @Override
    protected EntityManager getEntityManager() {
        return this.em;
    }
}
