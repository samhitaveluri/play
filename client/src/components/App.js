import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import PodcastsPage from './podcasts/PodcastsPage';
import ManagePodcastPage from './podcasts/ManagePodcastPage';
import PodcastPlayPage from './podcasts/PlayPodcastPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header></Header>
      <main class="main-content">
        <Switch>
          <Route path="/" component={HomePage} exact></Route>
          <Route path="/podcasts" component={PodcastsPage}></Route>
          <Route path="/podcast/:id" component={PodcastPlayPage}></Route>
          <Route path="/podcast" component={ManagePodcastPage}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
      </main>
      <ToastContainer autoClose={3000} hideProgressBar></ToastContainer>
    </>
  );
}

export default App;
