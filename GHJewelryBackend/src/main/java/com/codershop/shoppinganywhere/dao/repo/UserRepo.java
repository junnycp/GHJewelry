package com.codershop.shoppinganywhere.dao.repo;

import com.codershop.shoppinganywhere.dao.repo.ext.UserRepoExt;
import com.codershop.shoppinganywhere.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Long>, UserRepoExt {

    @Query(value = "SELECT COUNT(*) FROM users where username = :userName AND (:idUser IS NULL OR id_user != :idUser)", nativeQuery = true)
    int countUser(@Param("userName") String userName, @Param("idUser") Long idUser);

    @Query(value = "SELECT * FROM users WHERE username = :userName", nativeQuery = true)
    User findByUsername(@Param("userName") String userName);
}
