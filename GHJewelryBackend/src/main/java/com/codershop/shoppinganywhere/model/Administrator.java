package com.codershop.shoppinganywhere.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.persistence.*;

import java.io.Serializable;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "administrators", catalog = "datawebbh")
@JsonPropertyOrder({"id_admin", "userName", "password"})
public class Administrator implements Serializable {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id_admin;
    @Column(name = "username")
    private String userName;
    @Column(name = "password")
    private String password;

    public Administrator(Integer id_admin, String userName, String password) {
        this.id_admin = id_admin;
        this.userName = userName;
        this.password = password;
    }
    public Administrator() {

    }


    public Integer getId_admin() {
        return id_admin;
    }

    public void setId_admin(Integer id_admin) {
        this.id_admin = id_admin;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
