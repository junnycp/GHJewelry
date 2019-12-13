package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryServiceImpl;
import com.codershop.shoppinganywhere.model.Order;
import com.codershop.shoppinganywhere.service.OrderService;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl extends ComplexQueryServiceImpl<Order, Long> implements OrderService {
}
