import './directory-component.scss'
import DirectoryItem from '../directoryitem/directoryitem';

const Directory = ({categories}) => {
    // console.log(categories);
    return (
        <div className='directory-container'>
            {categories.map((category) => {
                return (
                <DirectoryItem key={category.id} category={category} />
                )
            })}
        </div>
    );
}

export default Directory