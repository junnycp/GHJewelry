package com.codershop.shoppinganywhere.dao.repo.ext.impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryRepositoryImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.repo.ext.UserRepoExt;
import com.codershop.shoppinganywhere.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class UserRepoExtImpl extends ComplexQueryRepositoryImpl<User> implements UserRepoExt {
    private final EntityManager em;

    @Autowired
    public UserRepoExtImpl(EntityManager em){
        super(User.class);
        this.em = em;
    }

    @Override
    protected Predicate[] getWhereCondition(CriteriaBuilder cb, Root<User> rootEntity, User user) {
        List<Predicate> predicates = new ArrayList<>();

        if(!ValidationUtil.isNull(user)){
            if (!ValidationUtil.isNullOrEmpty(user.getUserName())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("userName")),
                        "%" + user.getUserName().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNullOrEmpty(user.getEmail())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("email")),
                        "%" + user.getEmail().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNullOrEmpty(user.getPhone())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("phone")),
                        "%" + user.getPhone().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNullOrEmpty(user.getAddress())) {
                predicates.add(cb.like(cb.upper(rootEntity.get("address")),
                        "%" + user.getAddress().toUpperCase().replaceAll("_", "\\\\_") + "%", '\\'));
            }

            if (!ValidationUtil.isNull(user.getCreateTime())) {
                predicates.add(cb.equal(rootEntity.get("createTime"), user.getCreateTime()));
            }
        }
        return predicates.toArray(new Predicate[]{});

    }

    @Override
    protected EntityManager getEntityManager() {
        return this.em;
    }
}
