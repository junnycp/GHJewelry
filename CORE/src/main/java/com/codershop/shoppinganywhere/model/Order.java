package com.codershop.shoppinganywhere.model;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "shop_orders", catalog = "datawebbh")
public class Order {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id_order", unique = true, nullable = false)
    private Long idOrder;
    @Column(name = "id_user", unique = true, nullable = false)
    private Long idUser;
    @Column(name = "id_product", unique = true, nullable = false)
    private Long idProduct;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "amount")
    private Float amount;
    @Column(name = "created")
    private Date created;

    public Order(Long idOrder, Long idUser, Long idProduct, Integer quantity, Float amount, Date created) {
        this.idOrder = idOrder;
        this.idUser = idUser;
        this.idProduct = idProduct;
        this.quantity = quantity;
        this.amount = amount;
        this.created = created;
    }

    public Order() {
    }

    public Long getIdOrder() {
        return idOrder;
    }

    public void setIdOrder(Long idOrder) {
        this.idOrder = idOrder;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }
}
