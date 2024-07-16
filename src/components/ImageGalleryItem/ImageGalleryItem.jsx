import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../ImageGalleryItem/ImageGalleryItem.css';

class ImageGalleryItem extends Component {
  render() {
    const { imageUrl, onClick } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          src={imageUrl}
          alt=""
          className="ImageGalleryItem-image"
          onClick={onClick}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;