import React, { useEffect, useRef, useState } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import * as API from '../common/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal';
import Notiflix from 'notiflix';
import Loader from '../Loader/Loader';
import Clock from 'components/Clock';
import DetailSection from 'components/DetailSection';

const App = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [noImages, setNoImages] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log(isFirstRender);
    window.addEventListener('click', openModal);

    return () => {
      window.removeEventListener('click', openModal);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery === '') {
        return;
      }

      try {
        setIsloading(true);
        const imagesData = await API.getImages(searchQuery, page);

        setImagesData(prevState => [...prevState, ...imagesData.hits]);
        setImageCount(prevCount => prevCount + imagesData.hits.length);
        

        if (imagesData.hits.length === 0) {
          setNoImages(true);
        }
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, [page, searchQuery]);

  const handleSearchForm = async e => {
    e.preventDefault();
    setPage(1);
    setImagesData([]);
    setSearchQuery(e.currentTarget.elements.searchInput.value);

    e.currentTarget.reset();
  };

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
    // if (imageCount >= 500) {
    //   console.log('Конец количества изображений');
    //   setNoImages(true);
    // }
  };

  const openModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    setShowModal(true);
    setLargeImage(e.target);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar handleSearchForm={handleSearchForm} />
      {isLoading && <Loader />}
      <ImageGallery images={imagesData} />
      {error &&
        Notiflix.Notify.failure('Something wrong, please refresh a page')}
      {noImages && imageCount >= 500 &&
        Notiflix.Notify.info(
          'Sorry, no more images in your response. Try another word'
        )}
      {imagesData.length > 0 && noImages === false && (
        <Button loadMore={loadMoreImages} />
      )}
      <Clock />
      <DetailSection />
      {showModal && <Modal largeImage={largeImage} closeModal={closeModal} />}
    </>
  );
};

export default App;

