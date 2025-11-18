import './inputform.component.scss';

const InputForm = ({ label, ...otherprops }) => {
    return (
        <div className="group">
            <input className="form-input"{...otherprops}/>

            {label && (
                // {/* Now in case the label tag is not present then don't render the label simple, we can use AND operator here*/}

                // {/* We are using ternary operator on classnames because there will be multiple input tags, and to have different classes1 */}
                <label className={`${otherprops.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    );
}

export default InputForm;