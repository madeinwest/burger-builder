import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index.js'

class ContactData extends Component {
  state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation: {
					required: true,
					minLength:5,
					maxLength:5,
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastes', displayValue: 'Fastes'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					]
				},
				value: 'fastes',
				validation: {},
				valid: true
			}
		},
		formIsValid: false
  };
  orderHandler = e => {
    e.preventDefault();
		const formData = {}
		for (let formElementID in this.state.orderForm){
			formData[formElementID] = this.state.orderForm[formElementID].value
		}
    const order = {
      ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};
		this.props.onOrderBurger(order, this.props.token)
	};
	inputChangedHandler = (e ,inputID) => {
		const updatedOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElemnt = {
			...updatedOrderForm[inputID]
		}
		updatedFormElemnt.value = e.target.value;
		updatedFormElemnt.valid = this.checkValidity(updatedFormElemnt.value, updatedFormElemnt.validation);
		updatedFormElemnt.touched = true;
		updatedOrderForm[inputID] = updatedFormElemnt;
		let formIsValid = true;
		for(let inputID in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputID].valid && formIsValid
		}
		console.log(formIsValid)
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
	}
	checkValidity(value, rules) {
		let isValid = true;
		if(rules.required){
			isValid = value.trim() !== '' && isValid
		}
		if(rules.minLength){
			isValid = value.length >= rules.minLength && isValid
		}
		if(rules.maxLength){
			isValid = value.length <= rules.maxLength && isValid
		}
		return isValid
	}
  render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
				formElementsArray.push({
					id:key,
					config: this.state.orderForm[key]
				})
			}
    let form = (
      <form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input
						changed={(e) => this.inputChangedHandler(e, formElement.id)}
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
					/>
				))}
        <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
				{form}
      </div>
    );
  }
}

const mapStateToProps = state => {
	return{
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));
