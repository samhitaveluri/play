import React from 'react';
import { connect } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    width: 700,
    flexBasis: 'auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  cardMedia: {
    width: 256,
    height: 350,
  },
}));

function PlayPodcastPage({ podcast }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {podcast.title}
          </Typography>
        </CardContent>
        <AudioPlayer
          className={classes.player}
          controls
          src={process.env.REACT_APP_API_URL + '/audio/' + podcast.id}
        ></AudioPlayer>
      </div>
      <CardMedia>
        <img
          src={podcast.imageUrl}
          class={classes.cardMedia}
          alt={podcast.title}
        />
      </CardMedia>
    </Card>
  );
}

function getPodcastById(podcasts, id) {
  return podcasts.find((podcast) => podcast.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const podcast = getPodcastById(state.podcasts, id);
  return {
    podcast: podcast,
  };
}

export default connect(mapStateToProps)(PlayPodcastPage);
