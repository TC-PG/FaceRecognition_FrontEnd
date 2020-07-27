import React from 'react';


const Rank = ({name, entries}) =>{
    return (
        <div>
           <div>
               <div className='white f3'>
                   {`${name} , 您已使用 ${entries} 次`}
               </div>              
           </div>
        </div>
    );
}

export default Rank;