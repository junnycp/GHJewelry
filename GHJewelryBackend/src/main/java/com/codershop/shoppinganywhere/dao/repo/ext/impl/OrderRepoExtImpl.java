package com.codershop.shoppinganywhere.dao.repo.ext.impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryRepositoryImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.repo.ext.OrderRepoExt;
import com.codershop.shoppinganywhere.model.Order;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
public class OrderRepoExtImpl extends ComplexQueryRepositoryImpl<Order> implements OrderRepoExt {
    private final EntityManager em;

    @Autowired
    public OrderRepoExtImpl(EntityManager em) {
        super(Order.class);
        this.em = em;
    }

    @Override
    protected Predicate[] getWhereCondition(CriteriaBuilder cb, Root<Order> rootEntity, Order example) {
        List<Predicate> predicates = new ArrayList<>();
        return predicates.toArray(new Predicate[]{});
    }


    @Override
    protected EntityManager getEntityManager() {
        return this.em;
    }
}
