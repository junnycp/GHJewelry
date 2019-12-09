package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryServiceImpl;
import com.codershop.shoppinganywhere.model.OrderDetail;
import com.codershop.shoppinganywhere.service.DetailOrderService;
import org.springframework.stereotype.Service;

@Service
public class DetailOrderServiceImpl extends ComplexQueryServiceImpl<OrderDetail, Long> implements DetailOrderService {
}
