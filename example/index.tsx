import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tabset, Tab } from 'react-rainbow-components';
import { Simple } from './components/simple';
import { SimpleCode } from './components/simple-code';

const tabsContainerStyles = {
  backgroundColor: 'white',
  borderRadius: '0.875rem',
};

interface AppState {
  readonly selected: 'simple' | 'complex';
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = { selected: 'simple' };
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect(event, selected) {
    this.setState({ selected });
  }

  getTabContent() {
    const { selected } = this.state;

    if (selected === 'simple') {
      return (
        <div
          aria-labelledby="simple"
          id="simpleTab"
          className="rainbow-p-around_xx-large rainbow-m-bottom_xx-large rainbow-font-size-text_large rainbow-align-text-center rainbow-color_gray-3"
          style={{ display: 'flex', flex: 1 }}
        >
          <Simple />
          <SimpleCode />
        </div>
      );
    } else if (selected === 'complex') {
      return (
        <div
          aria-labelledby="complex"
          id="complexTab"
          className="rainbow-p-around_xx-large rainbow-m-bottom_xx-large rainbow-font-size-text_large rainbow-align-text-center rainbow-color_gray-3"
        >
          Rainbows caused by sunlight always appear in the section of sky directly
          opposite the sun.
        </div>
      );
    }
  }

  render() {
    const { selected } = this.state;

    return (
      <div style={tabsContainerStyles} className="rainbow-p-bottom_xx-large">
        <div className="rainbow-p-around_large rainbow-align-content_space-between rainbow-background-color_gray-1">
          <h3 className="rainbow-font-size-heading_medium rainbow-color_dark-1">
            This is the header
          </h3>
        </div>
        <div className="rainbow-flex rainbow-flex_column rainbow_vertical-stretch">
          <Tabset
            id="tabset-1"
            onSelect={this.handleOnSelect}
            activeTabName={selected}
            className="rainbow-background-color_gray-1 rainbow-p-horizontal_x-large"
          >
            <Tab
              label="Simple"
              name="simple"
              id="simple"
              ariaControls="simpleTab"
            />
            <Tab
              label="Complex"
              name="complex"
              id="complex"
              ariaControls="complexTab"
            />
          </Tabset>
          {this.getTabContent()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
