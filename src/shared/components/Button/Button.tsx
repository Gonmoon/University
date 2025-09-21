import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
	text: string;
	href?: string;
}

const Button: React.FC<ButtonProps> = ({
	text,
	href = "#",
}) => {

	return (
		<div className={styles.buttonContainer}>
			<a href={href} className={styles.buttonText}>{text}</a>
		</div>
	)
}

export default Button;