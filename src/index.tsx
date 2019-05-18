import React from "react";
import ReactDOM from "react-dom";
import { Provider, Subscribe } from 'unstated'
import { DebounceInput } from 'react-debounce-input';

import AppContainer from 'components/container'
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
            container.state.validRepo ? (
            <div className="app-container">
            {console.log('State', container.state)}
            <DebounceInput
              minLength={2}
              debounceTimeout={800}
              placeholder={container.state.currentRepo}
              className="repo-input"
              onChange={event => handleChange(event, container)} />
            </div>
            ) : (
              <h1>Invalid Repo</h1>
            )
          ) :
          (
            <h1>Loading...</h1>
          )
        }
      }
      </Subscribe>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
