import React, { useState, useEffect, useRef } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';
import { Button } from '@mui/material';

const CheckText = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [recogText, setRecogText] = useState('여기여기여기여기');

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    width: 600,
                    height: 700,
                    facingMode: 'environment',
                },
            })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.log('카메라 에러에러', err);
            });
    };

    const takePhoto = () => {
        const width = 500;
        const height = 500;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);

        setHasPhoto(true);
    };

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasPhoto(false);
    };

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    function textRecognize() {
        Tesseract.recognize(photoRef.current, 'eng+kor', {
            logger: (m) => {
                console.log('인식 결과:', m);
            },
        }).then(({ data: { text } }) => {
            setRecogText(text);
            console.log('text text', text);
        });
    }

    useEffect(() => {
        console.log('photoRef photoRef', photoRef);
        setInterval(textRecognize(), 3000);
    }, [hasPhoto]);

    return (
        <>
            <div>
                <h2>텍스트 인식</h2>
                <div style={{ marginBottom: 30 }}>
                    <div className='camera'>
                        <video ref={videoRef}></video>
                    </div>
                    <Button variant='contained' onClick={takePhoto}>
                        Save
                    </Button>
                </div>
                <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                    <canvas ref={photoRef}></canvas>
                    <br />
                    <Button variant='contained' onClick={closePhoto}>
                        Close
                    </Button>
                </div>
                <div>
                    <p>{recogText}</p>
                </div>
            </div>
        </>
    );
};

export default CheckText;
