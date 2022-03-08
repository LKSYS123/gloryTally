import './App.css';

import { Routes, Route, Link } from 'react-router-dom';
import { CheckBarCode, CheckQrCode, CheckText } from './pages';

function App() {
    return (
        <>
            <div className='list' style={{ margin: 10, lineHeight: 1.5 }}>
                <Link to='/checkQrCode'>QR코드</Link>
                <Link to='/checkBarCode'>QR코드 + 바코드</Link>
                <Link to='/checkText'>텍스트인식</Link>
                <hr />
            </div>
            <div style={{ width: '90vw', height: '75vh', marginLeft: 40 }}>
                <Routes>
                    {/* <Route path='/checkQrCode' element={<CheckQrCode />} /> */}
                    <Route path='/checkBarCode' element={<CheckBarCode />} />
                    <Route path='/checkText' element={<CheckText />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
