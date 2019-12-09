package com.codershop.shoppinganywhere.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "orders")
@JsonPropertyOrder({"idOrder", "idUser", "status", "total", "createdTime"})
public class AnOrder {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id_order", unique = true, nullable = false)
    private Long idOrder;

    @Column(name = "id_user")
    private Long idUser;

    @Column(name = "status")
    private Long status;

    @Column(name = "total")
    private String totalMoney;

    @Temporal(TemporalType.DATE)
    @Column(name = "created_time")
    private Date createTime;

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

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public String getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(String totalMoney) {
        this.totalMoney = totalMoney;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
