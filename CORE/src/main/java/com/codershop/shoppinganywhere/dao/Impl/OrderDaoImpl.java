package com.codershop.shoppinganywhere.dao.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.GenericDaoImpl;
import com.codershop.shoppinganywhere.dao.OrderDao;
import com.codershop.shoppinganywhere.model.Order;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class OrderDaoImpl extends GenericDaoImpl<Order, Integer> implements OrderDao {
    private final EntityManager em;

    public OrderDaoImpl(EntityManager em) {
        this.em = em;
    }
}
