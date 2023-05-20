import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

export default ImageGallery;

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

function ImageGallery({ gallery, onClick }) {
  return (
    <ul className={css.gallery}>
      {gallery.map(image => {
        const { largeImageURL, tags } = image;
        return (
          <ImageGalleryItem
            image={image}
            key={image.id}
            onClick={() => onClick({ largeImageURL, tags })}
          />
        );
      })}
    </ul>
  );
}
