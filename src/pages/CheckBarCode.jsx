/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import {
    BrowserMultiFormatReader,
    BarcodeFormat,
    DecodeHintType,
} from '@zxing/library';

const CheckBarCode = () => {
    const [localStream, setLocalStream] = useState();
    const [text, setText] = useState('');
    const Camera = useRef();
    const hints = new Map();
    const formats = [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODABAR,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.CODE_39,
        BarcodeFormat.CODE_93,
    ];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    const Scan = new BrowserMultiFormatReader(hints, 500);

    /*================== 카메라 실행 ================ */
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                // video: { facingMode: 'user' }, //전면카메라
                video: { facingMode: 'environment' }, //후면카메라
            })
            .then((stream) => {
                console.log(stream);
                setLocalStream(stream);
            });
        return () => {
            Stop();
        };
    }, []);

    useEffect(() => {
        if (!Camera.current) return;
        if (localStream && Camera.current) {
            Scanning();
        }
        return () => {
            Stop();
        };
    }, [localStream]);

    const Scanning = async () => {
        // const t = await Scan.decodeOnce();
        console.log('scan');
        if (localStream && Camera.current) {
            try {
                const data = await Scan.decodeFromStream(
                    localStream,
                    Camera.current,
                    (data, err) => {
                        if (data) {
                            setText(data.getText());
                            console.log('data data', data);
                            // 코드 읽은후 정지
                            // Scan.stopContinuousDecode();
                        } else {
                            setText('');
                        }
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };
    const Stop = () => {
        if (localStream) {
            const vidTrack = localStream.getVideoTracks();
            vidTrack.forEach((track) => {
                localStream.removeTrack(track);
            });
        }
    };

    return (
        <>
            <div>
                <h2>QR코드 or 바코드 인식</h2>
                <video ref={Camera} id='video' /> <br />
                <h3>{text}</h3>
            </div>
        </>
    );
};
export default CheckBarCode;
