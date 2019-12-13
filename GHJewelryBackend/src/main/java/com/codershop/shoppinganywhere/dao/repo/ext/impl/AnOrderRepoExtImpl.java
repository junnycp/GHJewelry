package com.codershop.shoppinganywhere.dao.repo.ext.impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryRepositoryImpl;
import com.codershop.shoppinganywhere.dao.repo.ext.AnOrderRepoExt;
import com.codershop.shoppinganywhere.model.AnOrder;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
public class AnOrderRepoExtImpl extends ComplexQueryRepositoryImpl<AnOrder> implements AnOrderRepoExt {
    private final EntityManager em;

    @Autowired
    public AnOrderRepoExtImpl(EntityManager em) {
        super(AnOrder.class);
        this.em = em;
    }

    @Override
    protected Predicate[] getWhereCondition(CriteriaBuilder cb, Root<AnOrder> rootEntity, AnOrder example) {
        List<Predicate> predicates = new ArrayList<>();
        return predicates.toArray(new Predicate[]{});
    }

    @Override
    protected EntityManager getEntityManager() {
        return this.em;
    }
}
