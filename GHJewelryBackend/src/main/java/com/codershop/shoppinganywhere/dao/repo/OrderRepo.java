package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.dao.repo.ext.OrderRepoExt;
import com.codershop.shoppinganywhere.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long>, OrderRepoExt {
}
