package com.codershop.shoppinganywhere.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class OrderDTO implements Serializable {
    private Long idOrder;
    private Long idUser;
    private Long idShipper;
    private Long status;
    private String totalMoney;
    private Date createTime;
    private List<OrderDetailEmbed> orderItem;

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

    public Long getIdShipper() {
        return idShipper;
    }

    public void setIdShipper(Long idShipper) {
        this.idShipper = idShipper;
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

    public List<OrderDetailEmbed> getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(List<OrderDetailEmbed> orderItem) {
        this.orderItem = orderItem;
    }
}
