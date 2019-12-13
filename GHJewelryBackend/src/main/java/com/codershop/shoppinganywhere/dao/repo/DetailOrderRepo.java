package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.dao.repo.ext.DetailOrderRepoExt;
import com.codershop.shoppinganywhere.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailOrderRepo extends JpaRepository<OrderDetail, Long>, DetailOrderRepoExt{
}
