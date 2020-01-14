import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}
export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	}
}
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			console.log(expirationTime)
			dispatch(logout())
		}, expirationTime)
	}
}

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHE6dIKNOGRZ_kca3VDzM7kHPL6pJWlPQ';
		if(!isSignup){
			url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHE6dIKNOGRZ_kca3VDzM7kHPL6pJWlPQ'
		}
		axios.post(url, authData)
			.then(resp => {
				dispatch(checkAuthTimeout(resp.data.expiresIn))
				dispatch(authSuccess(resp.data.idToken, resp.data.localId))
			})
			.catch(err => {
				console.log(err)
				dispatch(authFail(err.response.data.error))
			})
	}
}