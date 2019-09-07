import React from 'react';
import {createUseStyles} from 'react-jss';

// import logo from './logo.svg';

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createUseStyles({
  myButton: {
    '& span': {
      // jss-plugin-nested applies this to a child span
      fontWeight: 'bold', // jss-plugin-camel-case turns this into 'font-weight'
    },
    "backgroundColor": 'green',
    "color": 'green',
    "margin": {
      bottom: 0,
      left: '1rem',
      // jss-plugin-default-unit makes this 5px
      right: 0,
      // jss-plugin-expand gives more readable syntax
      top: 5,
    },
    "yes": 'yay',
  },
  myLabel: {
    fontStyle: 'italic',
  },
});

const AboutPage: React.SFC = () => {
  const classes = useStyles();
  return (
    <div>
      About Page
    </div>
  );
};

export default AboutPage;
