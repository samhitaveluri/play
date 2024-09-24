import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const listLayout = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6,
};

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    position: 'relative',
    transition: `all 0.2s ease-in-out`,
    height: '100%',
    backgroundColor: '#fff',
  },
  cardMedia: {
    flexShrink: 0,
    width: 256,
    height: 350,
    '&:hover': {
      transform: `scale(1.1)`,
    },
    transition: `all 0.5s ease-in-out`,
    cursor: 'pointer',
  },
}));

const PodcastList = ({ podcasts, onDeleteClick, onPlayClick }) => {
  const styles = useStyles();
  return (
    <>
      <Grid container spacing={4}>
        {podcasts.map((podcast, key) => {
          return (
            <Grid item key={key} {...listLayout}>
              <Card className={styles.card}>
                <LazyLoad
                  once={true}
                  height={200}
                  offset={[100, 0]}
                  overflow={true}
                >
                  <Zoom>
                    <img
                      src={podcast.imageUrl}
                      alt="Podcast Cover"
                      class={styles.cardMedia}
                    ></img>
                  </Zoom>
                </LazyLoad>
                <CardContent className="details">
                  <div className="top-content">
                    <Typography component="h5" variant="h5">
                      {podcast.title}
                    </Typography>
                    <Typography component="h6" variant="h6">
                      2018
                    </Typography>
                    <section className="summary">
                      <Typography variant="subtitle1" color="textSecondary">
                        {podcast.summary}
                      </Typography>
                    </section>
                  </div>
                  <div className="content-controls">
                    <Button onClick={() => onPlayClick(podcast)}>
                      Play Podcast
                    </Button>
                    <Button onClick={() => onDeleteClick(podcast)}>
                      Delete Podcast
                    </Button>
                    <div className="play-podcast-icon"></div>
                    <IconButton aria-label="Delete podcast" component="span">
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PodcastList;
