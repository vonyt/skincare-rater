package com.example.skincareapi;

public class InciResponse {
    
    
    private Skincare product;

    public InciResponse() {}

    public InciResponse(Skincare product){
        this.product = product;
    }

    public Skincare getProduct(){
        return product;
    }

    public void setProduct(Skincare product){
        this.product = product;
    }

}
