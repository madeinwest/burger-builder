import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxs';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
	<Aux>
		<Backdrop show={props.show} clicked={props.modalClose}/>
		<div
		style={{
			transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
			opacity: props.show ? '1' : '0'
		}}
		className={classes.Modal}>
		{props.children}
	</div>
	</Aux>
)

export default modal;