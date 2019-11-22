package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User,Integer> {
}
