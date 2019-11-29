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
import java.math.BigDecimal;
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
        query.setParameter("idUser", user.getIdUser());
        query.setParameter("userName", user.getUserName());
        query.setParameter("password", user.getPassword());
        query.setParameter("email", user.getEmail());
        query.setParameter("phone", user.getPhone());
        query.setParameter("address", user.getAddress());
        query.executeUpdate();
        return user;
    }

    @Override
    public boolean delete(Long idUser) {
        String sql = "DELETE FROM users WHERE id_user=:idUser";
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
        String sql = "SELECT * FROM users u WHERE (:userName IS NULL OR UPPER(u.username) like UPPER(:userName)) " +
                "AND (:password IS NULL OR UPPER(u.password) like UPPER(:password)) " +
                "";
        List<User> userList = new ArrayList<>();
        Query query = em.createNativeQuery(sql, Tuple.class);

        query.setParameter("userName", user.getUserName() == null ? null : ("%" + user.getUserName() + "%").replaceAll("\\\\_", ""));
        query.setParameter("password", user.getPassword() == null ? null : ("%" + user.getPassword() + "%").replaceAll("\\\\_", ""));

        List<Tuple> lstResult = query.getResultList();
        if (!ValidationUtil.isNullOrEmpty(lstResult)) {
            for (Tuple tuple : lstResult) {
                Integer id = tuple.get("id_user", Integer.class);
                user.setIdUser(id.longValue());

                user.setUserName(tuple.get("username", String.class));
                user.setEmail(tuple.get("email", String.class));
                user.setAddress(tuple.get("address", String.class));
                user.setPhone(tuple.get("phone", String.class));
                user.setPassword(tuple.get("password", String.class));
                userList.add(user);
            }
        }
        return userList;
    }
}
