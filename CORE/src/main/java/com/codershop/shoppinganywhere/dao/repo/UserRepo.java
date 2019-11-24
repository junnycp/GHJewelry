package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepo extends CrudRepository<User,Integer> {

    @Query(value = "SELECT * FROM users", nativeQuery = true)
    List<User> getAllUser();
}
