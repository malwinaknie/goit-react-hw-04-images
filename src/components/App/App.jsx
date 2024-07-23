import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from '../Searchbar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import './App.css';

const App = () => {
    const [images, setImages] = useState([]);;
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  

  const fetchImages = useCallback(() => {
    const API_KEY = '39497710-1ddb4a37369e676d8d5a2e638';
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;

    setIsLoading(true);

    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
  })
      .finally(() => {
        setIsLoading(false);
      });
    }, [query, page]);

  const handleSearchSubmit = useCallback(newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  }, []);

  const handleImageClick = useCallback(newLargeImageURL => {
    setLargeImageURL(newLargeImageURL);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setLargeImageURL('');
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  useEffect(() => {
    if (!query) return;

    fetchImages();
  }, [query, page, fetchImages]);

    return (
      <div className="App">
        <Searchbar onSubmit={handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && 
          <Button onClick={handleLoadMore} />
        }
        {showModal && (
          <Modal onClose={handleCloseModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }

export default App;
