import React from "react";
import ReactDOM from "react-dom";
import { Provider, Subscribe } from 'unstated'
import { DebounceInput } from 'react-debounce-input';

import AppContainer from 'components/container'
import Status from 'components/status'
import "./styles.scss";

function App(): JSX.Element {
  const handleChange = (e: any, container: AppContainer) => {
    const newRepo = e.target.value
    if (newRepo && newRepo.length) container.fetchCommits(newRepo)
  }
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
      {
        (container: AppContainer) => {
          return !container.state.isLoading ? (
            <div className="app-container">
            {console.log('State', container.state)}
            <Status
              text={(container.state.validRepo ? 'Current Repository: ' : 'Invalid Repository: ') + container.state.currentRepo}
            />
            <DebounceInput
              minLength={2}
              debounceTimeout={800}
              placeholder={container.state.currentRepo}
              className="repo-input"
              onChange={event => handleChange(event, container)} />
            </div>
          ) :
          (
            <Status
              text={'Loading...'}
            />
          )
        }
      }
      </Subscribe>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
