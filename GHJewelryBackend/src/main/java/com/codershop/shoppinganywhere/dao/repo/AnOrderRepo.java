package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.dao.repo.ext.AnOrderRepoExt;
import com.codershop.shoppinganywhere.model.AnOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnOrderRepo extends JpaRepository<AnOrder, Long>, AnOrderRepoExt {
}
