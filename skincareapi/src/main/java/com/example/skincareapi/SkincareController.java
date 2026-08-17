package com.example.skincareapi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://Jeanienes-MacBook-Pro.local:3000")
public class SkincareController {

    @Value("${INCI_API_KEY}")
    private String API_KEY;

    //RestClient 
    private final RestClient restClient;
    private SkincareRepository skincareRepository;


    SkincareController(RestClient restClient, SkincareRepository skincareRepository){
        this.restClient = restClient;
        this.skincareRepository = skincareRepository;
    }

    //GetMapping to grab a single product given it's barcode, search for item in existing repository before reaching out to API
    @GetMapping("/skincares/{id}")
    public Skincare getProduct(@PathVariable String id){
        
        InciResponse response; 
        Skincare product = skincareRepository.findById(id).orElse(null);
        if(product != null) {
            return product;
        }
        
        try {
            response = restClient.get()
                    .uri("https://inciapi.com/v1/products/{id}", id)
                    .header("X-API-Key", API_KEY)
                    .retrieve()
                    .body(InciResponse.class);

            Skincare newProduct = response.getProduct();
            skincareRepository.save(newProduct);
            return newProduct;
        } catch (RestClientException e){
            e.printStackTrace();
            throw e;
        }
    }

    //GetMapping to retrieve all products currently within the repository
    @GetMapping("/skincares/search")
    public List<Skincare> getAllProducts(){
        return skincareRepository.findAll();
    }

}
