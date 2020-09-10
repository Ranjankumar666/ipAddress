import React from 'react';
import image from '../../images/pattern-bg.png';
import classes from './background.module.css';


const Background =() =>{
  return (
    <React.Fragment>
      <img src={image} alt="background" className={classes.background}/>
    </React.Fragment>
    )
}

export default Background;
