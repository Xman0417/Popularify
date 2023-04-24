import { useEffect, useState } from 'react';
import { accessToken, logout} from './spotify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { GlobalStyle } from './styles';
import { Login, Profile, TopArtists, TopTracks, About } from './pages';
import { Navbar } from './components/';
import styled from 'styled-components/macro';

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

//Code for the App, Adding new routes happens here. 
function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
      {!token ? (
          <Login />
        ) : (
          <>
            <Navbar />
            
            <Router>
              <ScrollToTop />

              <Switch>
                <Route path="/top-artists">
                  <TopArtists />
                </Route>
                <Route path="/top-tracks">
                  <TopTracks />
                </Route>
                <Route path = "/about">
                  <About />
                </Route>
                <Route path="/">
                    <Profile />
                </Route>
              </Switch>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
