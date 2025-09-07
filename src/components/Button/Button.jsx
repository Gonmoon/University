import { Component } from 'react'
import './Button.scss'

export class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPressed: false,
      isHovered: false,
      isLoading: props.loading || false
    }
  }

  handleClick = (e) => {
    if (this.props.disabled || this.state.isLoading) return

    this.setState({ isPressed: true })
    
    if (this.props.onClick) {
      this.props.onClick(e)
    }
    
    setTimeout(() => {
      this.setState({ isPressed: false })
    }, 150)
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ 
      isHovered: false,
      isPressed: false 
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({ isLoading: this.props.loading })
    }
  }

  render() {
    const { 
      children, 
      variant = 'primary',
      size = 'medium',
      disabled = false,
      loading = false,
      type = 'button',
      className = '',
      icon,
      ...restProps 
    } = this.props

    const { isPressed, isHovered, isLoading } = this.state

    const buttonClass = [
      'button',
      `button__${variant}`,
      `button__${size}`,
      isPressed && 'button__pressed',
      isHovered && 'button__hovered',
      disabled && 'button__disabled',
      isLoading && 'button__loading',
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        type={type}
        className={buttonClass}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        disabled={disabled || loading}
        {...restProps}
      >
        {icon && !isLoading && <span className="button__icon">{icon}</span>}
        {!isLoading && children}
      </button>
    )
  }
}

export default Button