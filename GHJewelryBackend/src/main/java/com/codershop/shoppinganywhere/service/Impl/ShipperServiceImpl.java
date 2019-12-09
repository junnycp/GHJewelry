package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryServiceImpl;
import com.codershop.shoppinganywhere.dao.repo.ShipperRepo;
import com.codershop.shoppinganywhere.model.Shipper;
import com.codershop.shoppinganywhere.service.ShipperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShipperServiceImpl extends ComplexQueryServiceImpl<Shipper, Long> implements ShipperService {
    @Autowired
    private ShipperRepo repo;

    @Override
    public boolean isDuplicate(String idCard, Long idShipper) {
        return repo.countShipper(idCard, idShipper) > 0;
    }
}
