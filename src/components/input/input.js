import React from 'react';
import classes from './input.module.css';

const Input = props =>{
  console.log(props)
  return (
      <input type="text" onChange={props.change}
        value={props.value} 
        className={classes.input}
        placeholder={props.location}
        />
    )
}

export default Input;
