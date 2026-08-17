package com.example.skincareapi;

import jakarta.persistence.Embeddable;

@Embeddable
public class ProductAnalysis {
        private double overallSafetyScore;
        private String safetyLevel;
        private double cleanBeautyScore;
        private double comedogenicityScore;
        private double coverage;  

    ProductAnalysis(){}

    public ProductAnalysis(double overallSafetyScore, String safetyLevel, double cleanBeautyScore, double comedogenicityScore, double coverage){
        this.overallSafetyScore = overallSafetyScore;
        this.safetyLevel = safetyLevel;
        this.cleanBeautyScore = cleanBeautyScore;
        this.comedogenicityScore = comedogenicityScore;
        this.coverage = coverage;
    }

    public String getSafetyLevel(){
        return safetyLevel;
    }

    public void setSafetyLevel(String safetyLevel){
        this.safetyLevel = safetyLevel;
    }

    public double getCoverageLevel(){
        return coverage;
    }

    public void setCoverageLevel(double coverage){
        this.coverage = coverage;
    }

    public double getComodogenicityScore(){
        return comedogenicityScore;
    }

    public void setComodogenicityScore(double comedogenicityScore){
        this.comedogenicityScore = comedogenicityScore;
    }

    public double getCleanBeautyScore(){
        return cleanBeautyScore;
    }

    public void setCleanBeautyScore(double cleanBeautyScore){
        this.cleanBeautyScore = cleanBeautyScore;
    }

    public double getOverallSafetyScore(){
        return overallSafetyScore;
    }

    public void setOverallSafetyScore(double overallSafetyScore){
        this.overallSafetyScore = overallSafetyScore;
    }


}
