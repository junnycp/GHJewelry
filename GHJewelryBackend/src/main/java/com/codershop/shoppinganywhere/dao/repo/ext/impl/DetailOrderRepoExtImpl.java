package com.codershop.shoppinganywhere.dao.repo.ext.impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryRepositoryImpl;
import com.codershop.shoppinganywhere.dao.repo.ext.DetailOrderRepoExt;
import com.codershop.shoppinganywhere.model.OrderDetail;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
public class DetailOrderRepoExtImpl extends ComplexQueryRepositoryImpl<OrderDetail> implements DetailOrderRepoExt {
    private final EntityManager em;

    @Autowired
    public DetailOrderRepoExtImpl(EntityManager em) {
        super(OrderDetail.class);
        this.em = em;
    }

    @Override
    protected Predicate[] getWhereCondition(CriteriaBuilder cb, Root<OrderDetail> rootEntity, OrderDetail example) {
        List<Predicate> predicates = new ArrayList<>();
        return predicates.toArray(new Predicate[]{});
    }


    @Override
    protected EntityManager getEntityManager() {
        return this.em;
    }
}
