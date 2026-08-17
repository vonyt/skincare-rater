package com.example.skincareapi;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Skincare Products")
public class Skincare {
    @Id 
    private String barcode;
    private String name;
    private String brand;
    private String weight;

    @Column(columnDefinition = "TEXT")
    private String ingredients;

    private double qualityScore;
    @Embedded
    private ProductDetails details;
    //private List<String> analysisAllergenFlags;
    //would be nice to get skinTypeCompatability but its a friggin dictionary, too intense rn need basic funtionality first

    Skincare() {}

    public Skincare(String barcode, String name, String brand, String weight, String ingredients, double qualityScore, ProductDetails details){
        this.barcode = barcode;
        this.name = name;
        this.brand = brand;
        this.weight = weight;
        this.qualityScore = qualityScore;
        this.ingredients = ingredients;
        this.details = details;
    }

    //getters and setters
    /*public List<String> analysisAllergenFlags(){
        return analysisAllergenFlags;
    }

    public List<String> setAnalysisAllergenFlags(List<String> analysisAllergenFlags){
        return this.analysisAllergenFlags;
    }*/

    public ProductDetails getDetails(){
        return details;
    }

    public void setDetails(ProductDetails details){
        this.details = details;
    }

    public String getBarcode(){
        return barcode;
    }

    public String getIngredients(){
        return ingredients;
    }

    public void setIngredients(String ingredients){
        this.ingredients = ingredients;
    }

    public void setBarcode(String barcode){
        this.barcode = barcode;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getBrand(){
        return brand;
    }

    public void setBrand(String brand){
        this.brand = brand;
    }

    public String getWeight(){
        return weight;
    }

    public void setWeight(String weight){
        this.weight = weight;
    }

    public double getQualityScore(){
        return qualityScore;
    }

    public void setQualityScore(double qualityScore){
        this.qualityScore = qualityScore;
    }

    /*public double getOverallSafetyScore(){
        return overallSafetyScore;
    }

    public void setOverallSafetyScore(double overallSafetyScore){
        this.overallSafetyScore = overallSafetyScore;
    }*/

    //equals and hash functions
    //toString function

}
