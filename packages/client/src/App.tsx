import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import React from 'react';
import { createUseStyles } from 'react-jss';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
// import logo from './logo.svg';
import HomePage from './pages/HomePage';

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createUseStyles({
  myButton: {
    '& span': {
      // jss-plugin-nested applies this to a child span
      fontWeight: 'bold', // jss-plugin-camel-case turns this into 'font-weight'
    },
    "backgroundColor": 'blue',
    "color": 'green',
    "margin": {
      bottom: 0,
      // jss-plugin-default-unit makes this 5px
      left: '1rem',
      right: 0,
      // jss-plugin-expand gives more readable syntax
      top: 5,
    },
  },
  myLabel: {
    fontStyle: 'italic',
  },
});

const App: React.SFC = () => {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <div>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </div>
        <p className={classes.myButton}>
          This is the changing part
        </p>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/help" component={HelpPage} />
        </div>
        <div>
          Footer
        </div>
      </div>
    </Router>
  );
};

export default App;
