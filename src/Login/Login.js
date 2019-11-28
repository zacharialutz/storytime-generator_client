import React from 'react';
import config from '../config';

import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';

import './Login.css';

export default class Login extends React.Component {
	state = {
		error: null
	}

	static contextType = ApiContext;

	componentDidMount() {
		document.getElementById('username').focus();
	}

	// Validates form and sends req to update user
	onClickSubmit(e) {
		e.preventDefault();
		const logUser = {
			username: document.getElementById('username').value,
			password: document.getElementById('password').value,
		};

		fetch(config.API_ENDPOINT + `/users/login?username=${logUser.username}&password=${logUser.password}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			},
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then(res => this.context.onLogin(res))
			.catch(error => this.setState({ error }))
	}

	render() {
		return (
			<div>
				<header>
					<h2>Login</h2>
				</header>
				<section>
					<form className='loginForm' onSubmit={e => this.onClickSubmit(e)} >
						<label htmlFor='username'>username:</label>
						<input type='text' name='username' id='username' required /> <br />
						<label htmlFor='password'>password:</label>
						<input type='password' name='password' id='password' required /> <br />
						<input type='submit' value='Log In' />
					</form>
					{this.state.error &&
					<div className='errorMsg'>
						<h4>{this.state.error.message}</h4>
					</div>}
					<p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
				</section>
			</div>
		)
	}
}