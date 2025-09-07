import { Component } from 'react'
import './Reviews.scss'

export class Reviews extends Component {
  constructor(props) {
    super(props)
    this.reviews = props.reviews || [
        { name: "Богдан", text: "Эта кнопка работает безупречно!" },
        { name: "Коля", text: "Качество кнопки превзошло ожидания." },
        { name: "Никита", text: "Нажимается плавно и без задержек." }
    ]
  }

  render() {
    const { theme = 'light', variant = 'default' } = this.props
    
    const reviewsClass = `
      reviews 
      ${theme === 'dark' ? 'reviews--dark' : ''} 
      ${variant === 'compact' ? 'reviews--compact' : ''}
    `.trim()

    return (
      <section className={reviewsClass}>
        <h2 className="reviews__title">Отзывы</h2>
        <ul className="reviews__list">
          {this.reviews.map((review, index) => (
            <li key={index} className="reviews__item">
              <div className="reviews__card">
                <p className="reviews__text">"{review.text}"</p>
                <span className="reviews__author">— {review.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}