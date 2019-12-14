import React from "react";
import Aux from "../../../hoc/Auxs";
import Button from '../../UI/Button/Button'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
				{ingredientSummary}
			</ul>
			<p><b>Total price:</b> {props.totalPrice.toFixed(2)}</p>
			<p>Continue to Checout?</p>
			<Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;
