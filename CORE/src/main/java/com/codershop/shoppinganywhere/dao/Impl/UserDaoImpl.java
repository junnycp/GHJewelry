package com.codershop.shoppinganywhere.dao.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.GenericDaoImpl;
import com.codershop.shoppinganywhere.common.utils.ValidationUtil;
import com.codershop.shoppinganywhere.dao.UserDao;
import com.codershop.shoppinganywhere.dao.repo.UserRepo;
import com.codershop.shoppinganywhere.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDaoImpl extends GenericDaoImpl<User, Integer> implements UserDao {

    private final UserRepo repo;

    private final EntityManager em;

    @Autowired
    public UserDaoImpl(EntityManager em,
                       UserRepo repo) {
        this.em = em;
        this.repo = repo;
    }

    @Override
    public List<User> getAllUser() {
        return repo.getAllUser();
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
        query.setParameter("idUser", user.getIdUser());
        query.executeUpdate();
        return user;
    }

    @Override
    public boolean delete(Long idUser) {
        String sql = "DELETE FROM users WHERE id_user= :idUser";
        em.createNativeQuery(sql).setParameter("idUser", idUser).executeUpdate();
        return true;
    }

    @Override
    public User findById(Long idUser) {
        User user = findBy(idUser);
        return user;
    }

    @Override
    public List<User> findByExample(User user) {
        String sql = "SELECT * FROM users u WHERE u.username=:"+user.getUserName()+"";
        List<User> userList = new ArrayList<>();
        Query query = em.createNativeQuery(sql, Tuple.class);
        List<Tuple> lstResult = query.getResultList();
        if (!ValidationUtil.isNullOrEmpty(lstResult)) {
            for (Tuple tuple : lstResult) {
                user.setUserName(tuple.get("username", String.class));
                user.setEmail(tuple.get("email", String.class));
                user.setAddress(tuple.get("address", String.class));
                user.setPhone(tuple.get("phone", String.class));
                userList.add(user);
            }
        }
        return userList;
    }
}
