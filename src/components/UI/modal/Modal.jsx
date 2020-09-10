import React from 'react';
import classes from './Modal.module.css';
import BackDrop from '../backdrop/Backdrop'

const Modal = (props) =>{

		return (
				<React.Fragment>
				<BackDrop show={props.show} click={props.click}/>
				<div className={`${classes.Modal} ${classes.MarginTop}`}>
					{props.children}
				</div>
		
				</React.Fragment>
			)
		
}

export default React.memo(Modal,(prevProps, nextProps) =>{
	return prevProps.show === nextProps.show  && nextProps.children === prevProps.children
} );
