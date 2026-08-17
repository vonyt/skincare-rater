import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ScannerHolder ({ setProduct }) {

    const navigate = useNavigate();

    const [lastBarcode, setLastBarcode] = useState("");
    const [cameraStream, setCameraStream] = useState(null);

    const hStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '20px',

        backgroundImage: `
            linear-gradient(
            rgba(239, 221, 234, 0.5)`
    }

    const titleStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const scannerStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
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

    return (
        <div style={hStyle}>
            <header style = {titleStyle}>
                <h1><br />Scan Product Now</h1>
            </header>        
            <main>
                <div style = {scannerStyle}>

                  <BarcodeScanner
                    width={350}
                    height={350}

                    onUpdate={async(err, result) => {
                    debug("onUpdate fired");

                    if (err) {
                        debug(`Scanner error: ${err.name}: ${err.message}`);
                        return;
                    }

                    if (!result) {
                        debug("No barcode detected");
                        return;
                    }
                      const barcode = result.text;
                      if (barcode == lastBarcode) return;
                      setLastBarcode(barcode);
                        try {
                          const response = await fetch(
                            `/skincares/${barcode}`
                          );
                          if (!response.ok){
                            console.log("Product not found");
                            setLastBarcode("");
                            return;
                          }
                          const data = await response.json();
                          setProduct(data);
                          debug(`Barcode detected: ${barcode}`);
                          navigate("/product");
                        } catch (err){
                          console.error(err);
                        }
                        
                    }}
                  />
                </div>

                <div style = {buttonStyle}>
                    <Link to="/"><button style = {buttonTextStyle}>
                        Go To Homepage
                    </button></Link>
                    <Link to="/search"><button style = {buttonTextStyle}>
                        View all Products
                        </button></Link>
                </div>
            </main>
        </div>
    );
}

export default ScannerHolder;