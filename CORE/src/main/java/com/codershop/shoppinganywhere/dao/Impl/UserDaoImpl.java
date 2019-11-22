package com.codershop.shoppinganywhere.dao.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.GenericDaoImpl;
import com.codershop.shoppinganywhere.dao.UserDao;
import com.codershop.shoppinganywhere.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserDaoImpl extends GenericDaoImpl<User, Integer> implements UserDao {
    private final EntityManager em;

    public UserDaoImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<User> getAllUser() {
        String queryString = "select * from users";
        return (List<User>) em.createNativeQuery(queryString).getResultList();
    }

    @Override
    public User insert(User user) {
        user = save(user);
        return user;
    }

    @Override
    public User update(User user) {
        String sql = "UPDATE users u SET u.username=:userName, u.password=:password,u.email=:email,u.phone=:phone,u.address=:address " +
                " WHERE u.id_user=:idUser";
        Query query = em.createNativeQuery(sql);
        query.setParameter("userName", user.getUserName());
        query.setParameter("password", user.getPassword());
        query.setParameter("email", user.getEmail());
        query.setParameter("phone", user.getPhone());
        query.setParameter("address", user.getAddress());
        query.setParameter("idUser",user.getIdUser());
        query.executeUpdate();
        return user;
    }

    @Override
    public boolean delete(Long idUser) {
        String sql = "DELETE FROM users WHERE id_user= :idUser";
        em.createNativeQuery(sql).setParameter("idUser",idUser).executeUpdate();
        return true;
    }

    @Override
    public User findById(Long idUser) {
        User user = findBy(idUser);
        return user;
    }
}
