import React, {Component} from "react";
import Aux from "../../../hoc/Auxs";
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{
	componentWillUpdate() {
	}
	render () {
		const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: "capitalize" }}>{igKey}</span>:
					{this.props.ingredients[igKey]}
				</li>
			);
		});
		return(
		<Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
				{ingredientSummary}
			</ul>
			<p><b>Total price:</b> {this.props.totalPrice.toFixed(2)}</p>
			<p>Continue to Checout?</p>
			<Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
			<Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
    </Aux>
		)
	}
};

export default OrderSummary;
