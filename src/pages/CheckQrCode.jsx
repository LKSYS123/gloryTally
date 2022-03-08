import React, { useState, useEffect } from 'react';
import ScannerComponent from './ScannerComponent';

const CheckQrCode = () => {
    function handleBarcode(barcode) {
        console.log('scanned result', barcode);
    }

    return (
        <>
            <div style={{ width: 1000, margin: '0 auto' }}>
                <h2 style={{}}>QR체크 해주세요</h2>
                {/* <ScannerComponent
                    started={true}
                    onResult={handleBarcode()}
                    showButtons={true}
                /> */}
            </div>
        </>
    );
};

export default CheckQrCode;
