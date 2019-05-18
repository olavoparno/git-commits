import React from "react";
import ReactDOM from "react-dom";
import { Provider, Subscribe } from 'unstated'

import AppContainer from 'components/container'
import "./styles.scss";

function App(): JSX.Element {
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
      {
        (container: AppContainer) => {
          return !container.state.isLoading ? (
            <div className="app-container">
              {console.log('State', container.state.commits)}
              sasa
            </div>
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
