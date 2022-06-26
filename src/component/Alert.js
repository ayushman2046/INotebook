import React from 'react'

export default function Alert(props) {
    const capitalize = (word) =>{
      if(word==='danger'){
        word='error'
      }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  return ( 
    <div style={{height:'50px'}}>
    {
    props.alert &&
         <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong> : {props.alert.massage}
        {/* <button type='button' className='btn btn-close' data-bs-dismiss = "alert" aria-label='close'></button> */}
        </div>
    }
    </div>
    
  )
}
