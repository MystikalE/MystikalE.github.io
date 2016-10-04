'use strict';

import React from 'react';
import { Link } from 'react-router';
import BasicComp from '../BasicComp';

export default class Header extends BasicComp {
	fetchMe() {
		this.request.fetchMe = $.ajax({
			url: '/api/v1/me',
			dataType: 'json',
			success: (data) => {
				if(data.error)
				{
					this.notify.danger(data.error).run();
					return;
				}

				this.setState(data);
			},
			complete: () => {
				delete this.request.fetchMe;
			}
		});
	}

	componentDidMount() {
		this.fetchMe();
	}

	navHeader () {
		return (
			<div className="navbar-header">
				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#vacstatus-navbar">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<div className="navbar-display-logo">
					<Link className="navbar-brand" to="/" activeClassName="active">VacStatus</Link>
				</div>
			</div>
        )
	}

	navLeft () {
		let createList;

		if(this.authCheck) createList = <li><a href="#createListModal" data-toggle="modal">Create List</a></li>;

		return (
			<ul className="nav navbar-nav">
				<li><Link to="/news" activeClassName="active">News</Link></li>
				<li><Link to="/list" activeClassName="active">Lists</Link></li>
				{ createList }
				<li><a href="#searchModal" data-toggle="modal">Look Up Users</a></li>
			</ul>
        );
	}

	navRight () {
		let navProfile = <li><a className="steam-small-login" href="/auth/login">Sign in through STEAM</a></li>;
		let state = this.state;

		if(this.authCheck && state.user != undefined && state.user.id != undefined)
		{
			let user = state.user;

			navProfile = (
				<li className="dropdown">
					<a href="#" className="dropdown-toggle" data-toggle="dropdown">
						<div className="nav-username">{ user.display_name }</div>
						<div className="nav-avatar"><img src={ user.profile.avatar_thumb } /></div>
					</a>
					<ul className="dropdown-menu" role="menu">
						<li><Link to={ "/u/" + user.steam_64_id }>Profile</Link></li>
						<li><a href="/settings">Settings</a></li>
						<li className="divider" />
						<li><a href="/auth/logout">Sign Out</a></li>
					</ul>
				</li>
			);
		}

		return (
			<ul className="nav navbar-nav navbar-right">
				{ navProfile }
				<li>
					<Link className="heart-red" to="/donate" activeClassName="active"><span className="fa fa-heart"></span></Link>
				</li>
			</ul>
		);
	}

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container">
					{ this.navHeader() }

					<div className="collapse navbar-collapse" id="vacstatus-navbar">
						{ this.navLeft() }{ this.navRight() }
					</div>
				</div>
			</nav>
		)
	}
}