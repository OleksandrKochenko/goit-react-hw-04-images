import PropTypes from 'prop-types';
import ImageGalleryItem from './gallery-item';
import css from './gallery.module.css';

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.image_gallery}>
      {images.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            preview={item.webformatURL}
            original={item.largeImageURL}
            description={item.tags}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func,
};
