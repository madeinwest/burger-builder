import React, { Component } from "react";
import Aux from "../../hoc/Auxs";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import axios from "../../axios-orders";


class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
		console.log(this.props)
		this.props.onInitIngredients()
  }

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCalncelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
		this.props.onInitPurchase()
		this.props.history.push('/checkout')
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
		}
		let burger = this.props.error ?<p>Ingredients can't loaded!</p> : <Spinner />
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						purchasable={this.updatePurchasableState(this.props.ings)}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemove={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						ordered={this.purchaseHandler}
						price={this.props.price}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					totalPrice={this.props.price}
					purchaseCanceled={this.purchaseCalncelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={this.props.ings}
				/>
			);
		}
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCalncelHandler}
        >
          {orderSummary}
        </Modal>
				{burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
	return{
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseBurger())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
