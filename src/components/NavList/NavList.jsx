import { Component } from 'react'
import './NavList.scss'

export class NavList extends Component {
	constructor(props) {
		super(props)
		this.navList = props.navList || []
	}

	render() {
		return (
			<nav className="nav">
				<ul className="nav__list">
					{this.navList.map((item, index) => (
						<li key={index} className="nav__item">
							<a href="#" className="nav__link">
								{item}
							</a>
						</li>
					))}
				</ul>
			</nav>
		)
	}
}