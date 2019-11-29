package com.codershop.shoppinganywhere.dao.repo.ext.impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryRepositoryImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.repo.ext.ShipperRepoExt;
import com.codershop.shoppinganywhere.model.Shipper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
public class ShipperRepoExtImpl extends ComplexQueryRepositoryImpl<Shipper> implements ShipperRepoExt {
    private final EntityManager em;

    @Autowired
    public ShipperRepoExtImpl(EntityManager em) {
        super(Shipper.class);
        this.em = em;
    }

    @Override
    protected Predicate[] getWhereCondition(CriteriaBuilder cb, Root<Shipper> rootEntity, Shipper example) {
        List<Predicate> predicates = new ArrayList<>();

        if (!ValidationUtil.isNull(example)) {
            if (!ValidationUtil.isNullOrEmpty(example.getIdCard())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("idCard")),
                        "%" + example.getIdCard().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNullOrEmpty(example.getEmail())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("email")),
                        "%" + example.getEmail().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNullOrEmpty(example.getName())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("name")),
                        "%" + example.getName().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNullOrEmpty(example.getPhone())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("phone")),
                        "%" + example.getPhone().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNullOrEmpty(example.getAddress())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("address")),
                        "%" + example.getAddress().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }
        }
        return predicates.toArray(new Predicate[]{});
    }

    @Override
    protected EntityManager getEntityManager() {
        return this.em;
    }
}
