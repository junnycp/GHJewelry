package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.model.*;
import com.codershop.shoppinganywhere.service.AnOrderService;
import com.codershop.shoppinganywhere.service.DetailOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/AnOrder")
public class AnOrderController extends GenericController<AnOrder, Long> {

    @Autowired
    AnOrderService anOrderService;

    @Autowired
    DetailOrderService detailOrderService;

    @RequestMapping(value = "/onCreate", method = RequestMethod.POST)
    public ResponseEntity<Object> onCreate(@RequestBody OrderDTO orderDTO) {
        MessagesResponse msg = new MessagesResponse();
        AnOrder anOrder = new AnOrder();
        anOrder.setIdUser(orderDTO.getIdUser());
        anOrder.setIdShipper(orderDTO.getIdShipper());
        anOrder.setTotalMoney(orderDTO.getTotalMoney());
        anOrder.setStatus(orderDTO.getStatus());
        anOrder.setCreateTime(orderDTO.getCreateTime());

        AnOrder anOrderInsert = anOrderService.save(anOrder);
        Long orderId = anOrderInsert.getIdOrder();

        for (OrderDetailEmbed detail : orderDTO.getOrderItem()){
            OrderDetail orderDetail = new OrderDetail();
            OrderDetailEmbed detailEmbed = new OrderDetailEmbed();

            detailEmbed.setIdOrder(orderId);
            detailEmbed.setIdProduct(detail.getIdProduct());
            detailEmbed.setQuantity(detail.getQuantity());
            detailEmbed.setTotalMoney(detail.getTotalMoney());
            orderDetail.setOrderItem(detailEmbed);

            detailOrderService.save(orderDetail);
        }
        msg.setData(anOrder);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
}
