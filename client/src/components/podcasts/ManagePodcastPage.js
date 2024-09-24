import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as podcastAction from '../../redux/actions/podcastActions';
import * as authorActions from '../../redux/actions/authorActions';
import { newPodcast } from '../../tools/mockData';
import PropTypes from 'prop-types';
import PodcastForm from './PodcastForm';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManagePodcastPage({
  podcasts,
  authors,
  loadAuthors,
  loadPodcasts,
  savePodcast,
  history,
  ...props
}) {
  const [podcast, setPodcast] = useState({ ...props.podcast });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [previewSource, setPreviewSource] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedAudio, setSelectedAudio] = useState();

  function onFileChangeHandler(event) {
    const file = event.target.files[0];
    const { name } = event.target;
    if (name === 'image') {
      setSelectedImage(file);
      previewFile(file);
    } else {
      setSelectedAudio(file);
    }
  }

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  //entire section is for image: end

  useEffect(() => {
    if (podcasts.length === 0) {
      loadPodcasts().catch((error) => {
        alert('Loading podcasts failed' + error);
      });
    } else {
      setPodcast({ ...props.podcast });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading podcasts failed' + error);
      });
    }
  }, [props.podcast]);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setPodcast((previousPodcast) => ({
      ...previousPodcast,
      [name]: name === 'artistId' ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, artistId, summary } = podcast;
    const errors = {};

    if (!title) errors.title = 'Title is required';
    if (!artistId) errors.author = 'Author is required';
    if (!summary) errors.summary = 'Summary is required';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  //handle for save for form data
  function handleSaveForm(event) {
    event.preventDefault();
    let formData = new FormData();
    appendObjectAttributes(formData, podcast);
    formData.append('image', selectedImage, 'coverPodcast');
    formData.append('audio', selectedAudio, 'recordedAudio');
    setSaving(true);
    savePodcast(formData)
      .then(() => {
        toast.success('Course Saved');
        history.push('/podcasts');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function appendObjectAttributes(formData, podcast) {
    Object.keys(podcast).forEach((key) => {
      if (key !== 'id') {
        formData.append(key, podcast[key]);
      }
    });
  }

  return authors.length === 0 || podcasts.length === 0 ? (
    <Spinner />
  ) : (
    <PodcastForm
      podcast={podcast}
      errors={errors}
      authors={authors}
      onChange={handleFormChange}
      onSave={handleSaveForm}
      saving={saving}
      onFileChangeHandler={onFileChangeHandler}
      selectedImage={selectedImage}
      selectedAudio={selectedAudio}
      previewSource={previewSource}
    ></PodcastForm>
  );
}

ManagePodcastPage.propTypes = {
  podcast: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  podcasts: PropTypes.array.isRequired,
  loadPodcasts: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  savePodcast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function getPostCastBySlug(podcasts, slug) {
  return podcasts.find((podcast) => podcast.slug === slug) || null;
}

function mapStatesToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const podcast = slug ? getPostCastBySlug(state.podcasts, slug) : newPodcast;
  return {
    podcast: podcast,
    podcasts: state.podcasts,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadPodcasts: podcastAction.loadPodcasts,
  loadAuthors: authorActions.loadAuthors,
  savePodcast: podcastAction.savePodcast,
};

export default connect(mapStatesToProps, mapDispatchToProps)(ManagePodcastPage);
