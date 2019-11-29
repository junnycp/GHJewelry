package com.codershop.shoppinganywhere.model;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name= "shippers", schema = "datawebbh")
public class Shipper {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_shipper")
    @GeneratedValue(strategy = IDENTITY)
    private Long idShipper;
    @Column(name = "id_card", length = 20)
    private String idCard;
    @Column(name= "name", length = 255)
    private String name;
    @Column(name = "email", length = 255)
    private String email;
    @Column(name = "phone", length = 15)
    private String phone;
    @Column(name = "address", length = 255)
    private String address;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getIdShipper() {
        return idShipper;
    }

    public void setIdShipper(Long idShipper) {
        this.idShipper = idShipper;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
