package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.model.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderShopRepo extends CrudRepository<Order,Integer> {
}
