import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';
import SelectInput from '../common/SelectInput';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MicIcon from '@material-ui/icons/Mic';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
}));

const PodcastForm = ({
  podcast,
  onSave,
  onChange,
  onFileChangeHandler,
  selectedImage,
  selectedAudio,
  previewSource,
  saving = false,
  errors = {},
}) => {
  const classes = useStyles();
  return (
    <>
      <form fullWidth={true} onSubmit={onSave}>
        <Typography variant="h4" gutterBottom>
          {podcast.id ? 'Edit' : 'Add'} Podcast
        </Typography>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <TextInput
          name="title"
          label="Title"
          value={podcast.title}
          onChange={onChange}
          error={errors.title}
        />
        <TextInput
          name="year"
          label="Release Year"
          value={podcast.year}
          onChange={onChange}
          error={errors.year}
        />
        <TextField
          required
          multiline
          rows={4}
          id="summary"
          name="summary"
          label="Summary"
          fullWidth
          value={podcast.summary}
          onChange={onChange}
        />
        <div>
          <input
            accept="image/*"
            id="image-upload-button"
            className={classes.input}
            type="file"
            name="image"
            onChange={onFileChangeHandler}
          ></input>
          <label htmlFor="image-upload-button">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-image-upload-button"
            name="image"
            type="file"
            onChange={onFileChangeHandler}
          />
          <label htmlFor="icon-image-upload-button">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <input
            accept="audio/*"
            id="audio-upload-button"
            className={classes.input}
            type="file"
            name="audio"
            onChange={onFileChangeHandler}
          ></input>
          <label htmlFor="audio-upload-button">
            <Button variant="contained" color="primary" component="span">
              Upload Audio
            </Button>
          </label>
          <input
            accept="audio/*"
            className={classes.input}
            id="icon-audio-upload-button"
            name="audio"
            type="file"
            onChange={onFileChangeHandler}
          />
          <label htmlFor="icon-audio-upload-button">
            <IconButton
              color="primary"
              aria-label="upload audio"
              component="span"
            >
              <MicIcon />
            </IconButton>
          </label>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="choosen"
          style={{ height: '200px', width: '200px' }}
        ></img>
      )}
    </>
  );
};

PodcastForm.propTypes = {
  authors: PropTypes.array.isRequired,
  podcast: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  onFileChangeHandler: PropTypes.func.isRequired,
};

export default PodcastForm;
