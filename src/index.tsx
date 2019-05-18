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
          return (
            <div className="app-container">
              {container.fetchCommits()}
            </div>
          )
        }
      }
      </Subscribe>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
