import { useState, useEffect } from 'react';
import { fetchPhotos } from '../services/api';
import Searchbar from './searchbar/searchbar';
import ImageGallery from './image-gallery/gallery';
import Loader from './loader/loader';
import Modal from './modal/modal';
import Button from './load-button/load-button';
import './styles.css';

export default function App() {
  const [qValue, setQvalue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalSource, setModalSource] = useState({
    src: '',
    alt: '',
  });

  useEffect(() => {
    if (qValue === '') {
      return;
    }
    async function fetchData() {
      setIsLoading(true);
      const responce = await fetchPhotos(qValue, 1);
      setPhotos(prevState => {
        return [...prevState, ...responce.hits];
      });
      setIsLoading(false);
      setTotal(responce.totalHits);
      setPage(prevState => {
        return prevState + 1;
      });
    }
    setTimeout(fetchData);
  }, [qValue]);

  const formSubmitHandler = quieryValue => {
    if (quieryValue.trim() === '') {
      alert('Enter a search query');
    } else {
      setPhotos([]);
      setQvalue(quieryValue.trim());
      setPage(1);
    }
  };

  const addPhotos = async () => {
    setIsLoading(true);
    const responce = await fetchPhotos(qValue, page);
    setPhotos(prevState => {
      return [...prevState, ...responce.hits];
    });
    setPage(prevState => {
      return prevState + 1;
    });
    setIsLoading(false);
  };

  const modalOpener = event => {
    setModalSource({
      src: event.currentTarget.dataset.source,
      alt: event.currentTarget.getAttribute('alt'),
    });
  };

  const modalCloser = () => {
    setModalSource({
      src: '',
      alt: '',
    });
  };

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />

      {photos.length > 0 && (
        <ImageGallery images={photos} openModal={modalOpener} />
      )}

      {isLoading && <Loader />}

      {modalSource.src !== '' && (
        <Modal
          onClose={modalCloser}
          src={modalSource.src}
          alt={modalSource.alt}
        />
      )}

      {photos.length > 0 && photos.length < total && (
        <Button onClick={addPhotos} />
      )}
    </>
  );
}
