import { Component } from 'react'
import './Article.scss'


export class Article extends Component {
	render() {
		return (
			<article className="article">
				<h2 className="article__h2">{this.props.articleInfo.title}</h2>
				<p className="article__p">{this.props.articleInfo.about}</p>
			</article>
		)
	}
}