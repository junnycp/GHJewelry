package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryServiceImpl;
import com.codershop.shoppinganywhere.model.Shipper;
import com.codershop.shoppinganywhere.service.ShipperService;
import org.springframework.stereotype.Service;

@Service
public class ShipperServiceImpl extends ComplexQueryServiceImpl<Shipper, Long> implements ShipperService {
}
