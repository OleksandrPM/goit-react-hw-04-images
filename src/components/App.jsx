import { Component } from 'react';
import { getApiResponse, requestParameters } from 'pixabayApi/pixabay-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Image from './Image';
import Loader from './Loader';
import css from './App.module.css';

class App extends Component {
  state = {
    searchString: '',
    gallery: [],
    isLoading: false,
    error: null,
    isModalOpen: false,
  };

  async componentDidUpdate(_, prevState) {
    const {
      state: { searchString },
      updateGallery,
    } = this;

    if (prevState.searchString !== searchString) {
      requestParameters.page = 1;
      this.setState({ gallery: [] });

      if (searchString !== '') {
        this.setState({ isLoading: true });
        updateGallery(this.state.searchString);
      }
    }
  }

  loadNextPage = () => {
    this.setState({ isLoading: true });
    this.updateGallery(this.state.searchString);
  };

  updateGallery = searchString => {
    try {
      getApiResponse(searchString).then(response => {
        if (response.totalHits === 0) {
          alert(`Images by your request "${searchString}" did not found`);
          return;
        } else {
          this.setState({ gallery: [...this.state.gallery, ...response.hits] });
        }
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getSearchString = value => {
    if (this.state.searchString !== value.searchString) {
      this.setState({ searchString: value.searchString });
    } else {
      alert(`You are actually looking at "${value.searchString}" pictures`);
    }
  };

  openModal = ({ largeImageURL, tags }) => {
    this.setState({ isModalOpen: true });
    this.setState({ largeImageURL, tags });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    delete this.state.largeImageURL;
    delete this.state.tags;
  };

  render() {
    const {
      state: { gallery, isLoading, isModalOpen, largeImageURL, tags },
      getSearchString,
      loadNextPage,
      openModal,
      closeModal,
    } = this;

    console.log(isLoading); //

    return (
      <div className={css.app}>
        <Searchbar onSubmit={getSearchString} />

        {isLoading && requestParameters.page === 1 ? (
          <Loader />
        ) : (
          gallery.length > 0 && (
            <ImageGallery gallery={gallery} onClick={openModal} />
          )
        )}

        {requestParameters.page !== 1 &&
          (isLoading ? <Loader /> : <Button onClick={loadNextPage} />)}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <Image URL={largeImageURL} tags={tags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
