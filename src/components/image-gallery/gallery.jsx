import PropTypes from 'prop-types';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import css from './gallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <Gallery>
      <div className={css.image_gallery}>
        {images.map(item => {
          return (
            <Item
              key={item.id}
              thumbnail={item.webformatURL}
              original={item.largeImageURL}
              alt={item.tags}
              width={item.imageWidth}
              height={item.imageHeight}
            >
              {({ ref, open }) => (
                <div className={css.image_gallery_item}>
                  <img
                    className={css.image_gallery_item_image}
                    src={item.webformatURL}
                    ref={ref}
                    onClick={open}
                    alt={item.tags}
                  />
                </div>
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
