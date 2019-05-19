import React from "react";
import ReactDOM from "react-dom";
import { Provider, Subscribe } from 'unstated'

import { DebounceInput } from 'react-debounce-input';


import AppContainer from 'components/container'
import Status from 'components/status'
import Table from 'components/table'

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
                className="status-display"
                text={`${(container.state.validRepo ? 'Current Repository:' : 'Invalid Repository:')} container.state.currentRepo`}
              />
              <DebounceInput
                minLength={2}
                debounceTimeout={1000}
                placeholder={container.state.currentRepo}
                className="repo-input"
                onChange={event => handleChange(event, container)}
              />
              <Table
                data={container.state.commits}
              />
            </div>
          ) :
          (
            <Status
              className="status-display"
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
