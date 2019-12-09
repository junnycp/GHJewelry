package com.codershop.shoppinganywhere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.codershop.*")
@EntityScan("com.codershop.*")
public class ShoppinganywhereApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShoppinganywhereApplication.class, args);
    }

}
