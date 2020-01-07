import React, { Component } from "react";
import Aux from "../../hoc/Auxs";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
		loading: false,
		error: false
  };

  componentDidMount() {
		console.log(this.props)
    axios
      .get("https://mycrm-187a2.firebaseio.com/ingredients.json")
      .then(resp => {
        this.setState({ ingredients: resp.data });
			})
			.catch(error => {
				this.setState({error: true})
			});
  }

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = priceAddition + oldPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasableState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasableState(updatedIngredients);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCalncelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]))
		}
		queryParams.push('price='+this.state.totalPrice)
		const queryString = queryParams.join('&')
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		})
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
		}
		let burger = this.state.error ?<p>Ingredients can't loaded!</p> : <Spinner />
		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						purchasable={this.state.purchasable}
						ingredientAdded={this.addIngredientHandler}
						ingredientRemove={this.removeIngredientHandler}
						disabled={disabledInfo}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					totalPrice={this.state.totalPrice}
					purchaseCanceled={this.purchaseCalncelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={this.state.ingredients}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);
