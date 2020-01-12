import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";


export const addIngredient = (name) => {
	return{
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	}
}

export const removeIngredient = (name) => {
	return{
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	}
}

export const setIngredients = (ings) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ings
	}
}

export const fetchIngredientsFailed = () => {
	return{
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
}

export const initIngredients = () => {
	return dispatch => {
    axios
      .get("https://mycrm-187a2.firebaseio.com/ingredients.json")
      .then(resp => {
        dispatch(setIngredients(resp.data))
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed())
			});
	}
}