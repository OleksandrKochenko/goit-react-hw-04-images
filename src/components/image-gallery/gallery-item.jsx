import PropTypes from 'prop-types';
import css from './gallery.module.css';
export default function ImageGalleryItem({
  preview,
  original,
  description,
  openModal,
}) {
  return (
    <li className={css.image_gallery_item}>
      <img
        className={css.image_gallery_item_image}
        src={preview}
        alt={description}
        data-source={original}
        onClick={openModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  original: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
