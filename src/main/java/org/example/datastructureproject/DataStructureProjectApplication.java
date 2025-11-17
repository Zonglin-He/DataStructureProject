package org.example.datastructureproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
        "org.example.datastructureproject",
        "com.example.algovis"
})
public class DataStructureProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(DataStructureProjectApplication.class, args);
    }

}
