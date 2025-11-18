import './button.component.scss';

const BUTTON_TYPES = {
    inverted: 'inverted',
    google: 'google-sign-in'
};

const Button = ({label, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPES[buttonType]}`}
        {...otherProps}>{label}</button>
    );
}

export default Button;