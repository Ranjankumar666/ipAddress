import React from 'react';
import classes from './BackDrop.module.css';

const BackDrop=(props)=>{
	return (props.show)?<div className={classes.Backdrop} onClick={props.click}></div>:null;
}

export default BackDrop;
