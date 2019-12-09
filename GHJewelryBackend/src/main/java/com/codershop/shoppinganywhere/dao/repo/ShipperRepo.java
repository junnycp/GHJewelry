package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.dao.repo.ext.ShipperRepoExt;
import com.codershop.shoppinganywhere.model.Shipper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipperRepo extends JpaRepository<Shipper, Long>, ShipperRepoExt {

    @Query(value = "SELECT COUNT(*) FROM shippers where id_card = :idCard AND (:idShipper IS NULL OR id_shipper != :idShipper)", nativeQuery = true)
    int countShipper(@Param("idCard") String idCard, @Param("idShipper") Long idShipper);
}
