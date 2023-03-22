import React, { Component } from 'react';
import { fetchPhotos } from '../services/api';
import Searchbar from './searchbar/searchbar';
import ImageGallery from './image-gallery/gallery';
import Loader from './loader/loader';
import Modal from './modal/modal';
import Button from './load-button/load-button';
import './styles.css';

class App extends Component {
  state = {
    qValue: '',
    photos: [],
    total: 0,
    page: 1,
    isLoading: false,
    modalSource: {
      src: '',
      alt: '',
    },
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.qValue && this.state.qValue !== prevState.qValue) {
      this.setState({
        isLoading: true,
      });
      const responce = await fetchPhotos(this.state.qValue, this.state.page);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...responce.hits],
        total: responce.totalHits,
        page: prevState.page + 1,
        isLoading: false,
      }));
    }
  }

  formSubmitHandler = quieryValue => {
    quieryValue.trim() === ''
      ? alert('Enter a search query')
      : this.setState({
          photos: [],
          qValue: quieryValue.trim(),
          page: 1,
        });
  };

  addPhotos = async () => {
    this.setState({
      isLoading: true,
    });
    const responce = await fetchPhotos(this.state.qValue, this.state.page);
    const newPhotos = responce.hits;
    this.setState(prevState => ({
      photos: [...prevState.photos, ...newPhotos],
      page: prevState.page + 1,
      isLoading: false,
    }));
  };

  modalOpener = event => {
    this.setState({
      modalSource: {
        src: event.currentTarget.dataset.source,
        alt: event.currentTarget.getAttribute('alt'),
      },
    });
  };

  modalCloser = () => {
    this.setState({
      modalSource: {
        src: '',
        alt: '',
      },
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />

        {this.state.photos.length > 0 && (
          <ImageGallery
            images={this.state.photos}
            openModal={this.modalOpener}
          />
        )}

        {this.state.isLoading && <Loader />}

        {this.state.modalSource.src !== '' && (
          <Modal onClose={this.modalCloser}>
            <img
              src={this.state.modalSource.src}
              alt={this.state.modalSource.alt}
            />
          </Modal>
        )}

        {this.state.photos.length > 0 &&
          this.state.photos.length < this.state.total && (
            <Button onClick={this.addPhotos} />
          )}
      </>
    );
  }
}

export default App;
