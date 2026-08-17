import React from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner'
import {Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Product({ product: productProp }) {
    
    const location = useLocation();

    const product = productProp || location.state?.product;

    const hStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '20px',

        backgroundImage: `
            linear-gradient(
            rgba(239, 221, 234, 0.5)`
    }

    const titleSection = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '10vh'
    }

    const titleStyle = {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    }

    const buttonStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        gap: '30px',
    }

    const buttonTextStyle = {
        gap: '60px',
        fontSize: '15px',
        width: '250px',
        height: '50px',
        borderRadius: '999px',
        color: 'black',
        backgroundImage: `
            linear-gradient(
            rgba(251, 208, 239, 0.5)`
    }

    const resultStyle = {
        display: 'flex',
        width: '80%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        margin: '0 auto',
        gap: '5px',
        padding: '20px'
    }



    if (!product) {
        return <h2 style = {titleStyle}>No Product Scanned</h2>;
    }
    return (
        <div style = {hStyle}>
            <div style = {titleSection}>
                 <h1 style = {titleStyle}>{product.name}</h1></div>
            <p style = {resultStyle}>
                <strong>Brand:</strong> {product.brand}
            </p>
            <p style = {resultStyle}>
                <strong>Quality Score: </strong> {product.qualityScore}
            </p>
            <p style = {resultStyle}>
                <strong>Weight: </strong> {product.weight}
            </p>
            <p style = {resultStyle}>
                <strong>Ingredients: </strong> {product.ingredients}
            </p>
            <p style = {resultStyle}>
                <strong>Warnings: </strong> {product.warnings}
            </p>
            <p style = {resultStyle}>
                <strong>SPF: </strong> {product.details?.spf}
            </p>
            <p style = {resultStyle}>
                <strong>Overall Safety Score: </strong> {product.details?.analysis?.overallSafetyScore}
            </p>
            <p style = {resultStyle}>
                <strong>Clean Beauty Score</strong> {product.details?.analysis?.cleanBeautyScore}
            </p>

            <div style = {buttonStyle}>
                <Link to="/"><button style = {buttonTextStyle}>
                    Return to Homepage
                    </button></Link>
                <Link to="/search"><button style = {buttonTextStyle}>
                    Return to Search
                    </button></Link>
                <Link to="/Scanner"><button style = {buttonTextStyle}>
                    Return to Scanner
                    </button></Link>
            </div>
        </div>
    );

}

export default Product;