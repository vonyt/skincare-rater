import React from 'react';
import { Link } from "react-router-dom";

function HomePage () {
    const background = '/background.jpeg';
    const hStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '20px',

        backgroundImage: `
            linear-gradient(
            rgba(255, 255, 255, 0.5),
             rgba(255,255,255, 0.5)),
        url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const welcomeStyle = {
        display: 'flex',
        minHeight: '50vh',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }

    const buttonStyle = {
        display: 'flex',
        minHeight: '50vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        gap: '30px',

    }

    const buttonTextStyle = {
        gap: '60px',
        fontSize: '30px',
        width: '400px',
        height: '80px',
        borderRadius: '999px',
        color: 'black',
        backgroundImage: `
            linear-gradient(
            rgba(239, 227, 236, 0.5)`
    }



    return (
        <div style={hStyle}>
            <div style={welcomeStyle}> 
                <h1>Welcome to My Simple Skincare Rater <br /> </h1>
            </div>

            <div style={buttonStyle}>
                <Link to="/scanner"><button style={buttonTextStyle}>
                    Scan Product Barcode
                    </button>
                    </Link>
                <Link to="/search"><button style={buttonTextStyle}>
                    Search Product by name
                    </button></Link>
            </div>
        </div>

        
    );
}

export default HomePage;