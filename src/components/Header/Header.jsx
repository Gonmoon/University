import { NavList } from '../NavList/NavList.jsx'
import { Component } from 'react'
import './Header.scss'


export class Header extends Component {
	render() {
		return (
			<header className="header">
				<div className="header__container">
					<div className="header__logo">
						<h1>App</h1>
					</div>
					
					<NavList navList={this.props.navList} />
				</div>
			</header>
		)
	}
}