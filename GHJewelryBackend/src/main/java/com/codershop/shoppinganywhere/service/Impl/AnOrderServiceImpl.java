package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryServiceImpl;
import com.codershop.shoppinganywhere.model.AnOrder;
import com.codershop.shoppinganywhere.service.AnOrderService;
import org.springframework.stereotype.Service;

@Service
public class AnOrderServiceImpl extends ComplexQueryServiceImpl<AnOrder, Long> implements AnOrderService {
}
