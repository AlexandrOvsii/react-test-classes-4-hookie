import React, { useEffect, useState } from 'react';
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
  const [searchedImages, setSearchedImages] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [noImages, setNoImages] = useState(false);
  const [imageCount, setImageCount] = useState(0);


  useEffect(() => {
    window.addEventListener('click', openModal);

    return () => {
      window.removeEventListener('click', openModal);
    };
  }, []);

  const handleSearchForm = async e => {
    e.preventDefault();
    const searchedImagesValue = e.currentTarget.elements.searchInput.value;
    setSearchedImages(searchedImagesValue);

    if (searchedImagesValue === '') {
      return;
    }

    try {
      setIsloading(true);
      const imagesData = await API.getImages(searchedImages, page);
      console.log(imagesData);

      setImagesData(prevState => [...prevState, ...imagesData.hits]);
      setImageCount(prevCount => prevCount + imagesData.hits.length);
      e.target.reset()
      if (imagesData.hits.length === 0) {
        setNoImages(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsloading(false);
    }
  };

  const loadMoreImages = async () => {
    try {
      setIsloading(true);
      const images = await API.getImages(searchedImages, page);

      if (imageCount >= 500) {
        console.log('Конец количества изображений');
        setNoImages(true);
      }
      setImagesData(prevState => [...prevState, ...images.hits]);

      setImageCount(prevState => prevState + images.hits.length);

      setPage(prevState => prevState + 1);
    } catch (error) {
      setError(true);
    } finally {
      setIsloading(false);
    }
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
    <div>
      <Searchbar handleSearchForm={handleSearchForm} />

      {isLoading && <Loader />}

      <ImageGallery images={imagesData} />

      {error &&
        Notiflix.Notify.failure('Something wrong, please refresh a page')}

      {noImages &&
        Notiflix.Notify.info(
          'Sorry, no more images in your response. Try another word'
        )}

      {imagesData.length > 0 && noImages === false && (
        <Button loadMore={loadMoreImages} />
      )}
      <Clock />
      <DetailSection />
      {showModal && <Modal largeImage={largeImage} closeModal={closeModal} />}
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     showModal: false,
//   };

//   componentDidMount() {
//     console.log('componentDidMount');
//   }

//   componentWillUnmount() {
//     console.log('componentWillUnmount');
//   }

//   toggleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }));
//   };

//   render() {
//     const { showModal } = this.state;

//     return (
//       <div>
//         <button type="button" onClick={this.toggleModal}>
//           Открыть модалку
//         </button>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <h1>привет</h1>
//             <p>
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//               Explicabo adipisci consequatur distinctio consectetur temporibus
//               cum eos, necessitatibus esse, mollitia, alias illo similique? Quam
//               fuga sequi quos! Voluptate deleniti quasi repellendus.
//             </p>
//             <button type="button" onClick={this.toggleModal}>
//               Закрыть модалку
//             </button>
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
