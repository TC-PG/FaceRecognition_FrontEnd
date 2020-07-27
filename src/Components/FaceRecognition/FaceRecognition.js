import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) =>{
    let boxArray = box.map((item, i) => {
        return <span key = {i} className='bounding-box' style={{top:item.topRow, right:item.rightCol, bottom: item.bottomRow, left:item.leftCol}}></span>
    });
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
                {boxArray}
                {/* <span className='bounding-box' style={{top:box.topRow, right:box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></span>         */}
            </div>
        </div>
    );
}

export default FaceRecognition;