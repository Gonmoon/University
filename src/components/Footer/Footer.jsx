import { NavList } from '../NavList/NavList.jsx'
import { Component } from 'react'
import './Footer.scss'


export class Footer extends Component {
	render() {
		return (
			<footer className="footer">
					<NavList navList={this.props.navList} />
			</footer>
		)
	}
}