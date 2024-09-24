import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import PodcastList from './PodcastList';
import * as podcastAction from '../../redux/actions/podcastActions';
import * as authorActions from '../../redux/actions/authorActions';

class PodcastsPage extends React.Component {
  state = {
    redirectToAddPodcastPage: false,
    searchValue: '',
  };
  componentDidMount() {
    if (this.props.podcasts.length === 0) {
      this.props.actions.loadPodcasts().catch((error) => {
        alert('Loading courses failed' + error);
      });
    }

    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert('Loading courses failed' + error);
      });
    }
  }

  handleDeletePodcast = (podcast) => {
    toast.success('Podcast Deleted');
    this.props.actions.deletePodcast(podcast).catch((error) => {
      toast.error('Delete failed.' + error.message, { autoClose: false });
    });
  };

  handlePodcastPlay = (podcast) => {
    this.props.history.push('/podcast/' + podcast.id);
    alert('/podcast/' + podcast.id);
  };

  setSearchValue = () => {};

  render() {
    return (
      <>
        {this.state.redirectToAddPodcastPage && (
          <Redirect to="/podcast"></Redirect>
        )}
        <div className="heading-bar">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ redirectToAddPodcastPage: true })}
          >
            Add Podcast
          </Button>
          <div className="search-box">
            <div className="search-icon">
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              value={this.state.searchValue}
              onChange={this.setSearchValue}
            />
          </div>
        </div>

        {this.props.loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <PodcastList
              onDeleteClick={this.handleDeletePodcast}
              onPlayClick={this.handlePodcastPlay}
              podcasts={this.props.podcasts}
            ></PodcastList>
          </>
        )}
      </>
    );
  }
}

PodcastsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  podcasts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStatesToProps(state, ownProps) {
  return {
    podcasts: state.podcasts,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dipatch) {
  return {
    actions: {
      loadPodcasts: bindActionCreators(podcastAction.loadPodcasts, dipatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dipatch),
      deletePodcast: bindActionCreators(podcastAction.deletePodcast, dipatch),
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(PodcastsPage);
