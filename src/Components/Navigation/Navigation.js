import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) =>{    
        if(isSignedIn){
            return(
            <nav style={{display: 'flex', justifyContent:'flex-end'}}> 
                <p className='f3 link dim black underline pa3 pointer' onClick ={()=> onRouteChange('signout')} >登出</p>
            </nav>
            );
        }else{
            return(
            <nav style={{display: 'flex', justifyContent:'flex-end'}}> 
                <p className='f3 link dim black underline pa3 pointer' onClick ={()=> onRouteChange('signin')} >登入</p>
                <p className='f3 link dim black underline pa3 pointer' onClick ={()=> onRouteChange('register')} >註冊</p>
            </nav> 
            );
        }
   
}

export default Navigation;