package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.model.Administrator;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AdministratorRepo extends CrudRepository<Administrator,Integer> {
    @Query(value = "SELECT * FROM administrators", nativeQuery = true)
    List<Administrator> getAllAdministrator();

    @Query(value = "SELECT * FROM administrators WHERE username = :username", nativeQuery = true)
    Administrator findByUsername(String username);
}
