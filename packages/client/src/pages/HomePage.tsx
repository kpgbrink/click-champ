import React from 'react';
import {createUseStyles} from 'react-jss';
import IApple from '../../../types/IApple';
import Component, {AjajMethod} from '../components/Component';

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

class HomePage extends Component<{}, {
  apple: IApple,
}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      apple: {
        isGreen: false,
        isYummy: true,
      },
    };
  }
  doSomethingNiceAsync = async () => {
    await this.runCancellableStatefulAsync(
      {
      },
      async () => {
        const res = await this.ajaj<IApple, IApple>({
          data: this.state.apple,
          method: AjajMethod.POST,
          uri: '/api/orange',
        });
        this.setState({
          apple: res,
        });
      },
      {},
      () => {
        window.alert('Failed to post things');
      },
    );
  }
  render() {
    return <StylishHomePage apple={this.state.apple} onButtonClick={this.doSomethingNiceAsync} />;
  }
}

const StylishHomePage: React.SFC<{
  apple: IApple,
  onButtonClick: () => void,
}> = info => {
  const classes = useStyles();
  return (
    <div>
      <div>
        Home Page. Apple is {info.apple.isGreen ? 'green' : 'red'} and {info.apple.isYummy ? 'yummy' : 'disgusting'}.
      </div>
      <div>
        <button onClick={info.onButtonClick}>Button</button>
      </div>>
    </div>
  );
};

export default HomePage;
