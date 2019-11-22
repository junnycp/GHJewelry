package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.dao.OrderDao;
import com.codershop.shoppinganywhere.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("OrderServiceImpl")
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderDao orderDao;
}
