import React, { Component } from "react";
import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}
class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable:false,
		purchasing: false
	}

	updatePurchasableState (ingredients) {
		const sum = Object.keys(ingredients).map(
			igKey => {
				return ingredients[igKey]
			}
		).reduce((sum, el) => {
			return sum + el
		}, 0);
		this.setState({purchasable: sum > 0})
	}
	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = priceAddition + oldPrice;
		this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
		this.updatePurchasableState(updatedIngredients)
	};
	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0 ){
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction ;
		this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
		this.updatePurchasableState(updatedIngredients)
	};
	purchaseHandler = () => {
		this.setState({purchasing:true})
	}
	purchaseCalncelHandler = () => {
		this.setState({purchasing:false})
	}
	purchaseContinueHandler = () => {
		alert('You continue!')
	}
	render() {
		const disabledInfo = {
			...this.state.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		return (
			<Aux>
				<Modal show = {this.state.purchasing} modalClose={this.purchaseCalncelHandler}>
					<OrderSummary
						totalPrice={this.state.totalPrice}
						purchaseCanceled={this.purchaseCalncelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						ingredients={this.state.ingredients}/>
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					purchasable={this.state.purchasable}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemove={this.removeIngredientHandler}
					disabled={disabledInfo}
					ordered={this.purchaseHandler}
					price={this.state.totalPrice}
				/>
			</Aux>
		)
	}
}

export default BurgerBuilder;