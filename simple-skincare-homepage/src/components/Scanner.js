import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ScannerHolder ({ setProduct }) {

    const navigate = useNavigate();

    const [lastBarcode, setLastBarcode] = useState("");
    const [cameraStream, setCameraStream] = useState(null);
    const videoRef = useRef(null);
    const readerRef = useRef(null);
    const lastBarcodeRef = useRef("");
    const lookupInProgressRef = useRef(false);

    const [debugMessages, setDebugMessages] = useState([]);

    const debug = (message) => {
    console.log(message);

    setDebugMessages(prev => [
        ...prev.slice(-20),
        `${new Date().toLocaleTimeString()} - ${message}`
    ]);
};  


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
        justifyContent: 'center',
        padding: '40px',
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

    useEffect(() =>{
    debug(`Current URL: ${window.location.href}`);
    debug(`Secure context: ${window.isSecureContext}`);
    debug(`MediaDevices: ${!!navigator.mediaDevices}`);

    if(!navigator.mediaDevices) {
        debug("Camera API is not available");
        return;
    }
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { ideal: "environment"}
        }
    })
    .then((stream) => {
        debug("CAMERA WORKS!");
        setCameraStream(stream);
    })
    .catch((error) => {
        debug(`CAMERA ERROR: ${error.name}: ${error.message}`);
    });

    return () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
    };
}, []);

    useEffect(() => {
        if (!cameraStream || !videoRef.current) return;
        debug("Starting barcode reader");

        const reader = new BrowserMultiFormatReader();
        readerRef.current = reader;

        reader.decodeFromVideoElement(
            videoRef.current,
            async (result, error) => {
                if (result) {
                    const barcode = result.getText();
                    debug(`BARCODE FOUND: ${barcode}`);

                    if(lookupInProgressRef.current) {
                        debug("Lookup already in progress, ignoring barcode");
                        return;
                    }

                    if (barcode === lastBarcodeRef.current){
                        debug("Duplicate barcode, ignoring")
                        return;
                    }

                    lookupInProgressRef.current = true;
                    lastBarcodeRef.current = barcode;

                    try {
                        debug(`Looking up product: ${barcode}`);

                        const response = await fetch(`/skincares/${barcode}`);

                        debug(`API resonse: ${response.status}`);

                        if(!response.ok) {
                            debug("Product not found");
                            lastBarcodeRef.current = ("");
                            lookupInProgressRef.current = false;
                            return;
                        }

                        const data = await response.json();

                        debug(`Product found: ${data.name}`);

                        setProduct(data);
                        debug("setProduct completed");

                        debug("Navigating to /product");
                        navigate("/product");

                    } catch (err) {
                        debug(`API ERROR: ${err.message}`)
                        lastBarcodeRef.current = "";
                        lookupInProgressRef.current = false;
                    }
                }
            }

        )
        .then((controls) => {
            readerRef.current = controls;
            debug("Barcode reader started!");
        })
        .catch((error) => {
            debug(`READER ERROR: ${error.name}: ${error.message}"`);
        });

        return () => {
            if (readerRef.current) {
                readerRef.current.stop();
                readerRef.current = null;
            }
        };

    }, [cameraStream]);


    useEffect(() => {
        if (!cameraStream || !videoRef.current) return;

        debug("Attaching camera stream to video");

        videoRef.current.srcObject = cameraStream;

        videoRef.current.play().catch((error) => {
            debug(`VIDEO PLAY ERROR: ${error.message}`);
        });
    }, [cameraStream]);

    return (
        <div style={hStyle}>
            <header style = {titleStyle}>
                <h1><br />Scan Product Now</h1>
            </header>        
            <main>
                <div style = {scannerStyle}>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{
                            width: "600px",
                            height: "500px",
                            backgroundColor: "black",
                            objectFit: "cover"
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