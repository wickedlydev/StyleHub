import { Link } from 'react-router-dom';
import './directoryitem.scss'

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  const dpath = `/shop/${title}`;
  return (
    <Link className='directory-item-container' to={dpath}>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='body'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </Link>
  );
};

export default DirectoryItem;