package com.codershop.shoppinganywhere.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.persistence.*;

@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @EmbeddedId
    private OrderDetailEmbed orderItem;

    public OrderDetailEmbed getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(OrderDetailEmbed orderItem) {
        this.orderItem = orderItem;
    }
}
