package com.example.skincareapi;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
public class ProductDetails {

    private String warnings; 
    private String spf;

    @Embedded
    private ProductAnalysis analysis;


    ProductDetails(){}

    ProductDetails(String warnings,ProductAnalysis analysis, String spf){
        this.warnings = warnings;
        this.analysis = analysis;
        this.spf = spf;
    }

    public String getSpf(){
        return spf;
    }

    public void setSpf(String spf){
        this.spf = spf;
    }

    public ProductAnalysis getAnalysis(){
        return analysis;
    }

    public void setAnalysis(ProductAnalysis analysis){
        this.analysis = analysis;
    }

    public String getwarnings(){
        return warnings;
    }

    public void setWarnings(String warnings){
        this.warnings = warnings;
    }
}
