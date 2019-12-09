package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.config.MyConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Controller
public class EmailController {
    @Autowired
    public JavaMailSender emailSender;

    @ResponseBody
    @RequestMapping("/sendSimpleEmail")
    public String sendSimpleEmail() throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();

        boolean multipart = true;

        MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");

        String htmlMsg = "<h3>Tặng em</h3>"
                +"<img src='https://ap.poly.edu.vn/user/ph/PH06367.jpg'>";

        message.setContent(htmlMsg, "text/html");

        helper.setTo(MyConstants.FRIEND_EMAIL);

        helper.setSubject("Xem đi thằng ml nào đấy?");


        this.emailSender.send(message);

        return "Email Sent!";
    }
}
