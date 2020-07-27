import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onPictureSubmit}) =>{
    return (
        <div>
            <p className='f3'>
                {'輸入照片連結以辨識臉部區塊'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='text' className='f4 pa2 w-70 center' onChange= {onInputChange} />
                    <button  className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit}>確定</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;