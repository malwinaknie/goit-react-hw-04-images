import React, { Component } from 'react';
import Searchbar from '../Searchbar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import './App.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: false,
    largeImageURL: '',
    isLoading: false,
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const API_KEY = '39497710-1ddb4a37369e676d8d5a2e638';
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
        }));
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchSubmit = query => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
        {showModal && (
          <Modal onClose={this.handleCloseModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
