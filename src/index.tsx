import React from "react";
import ReactDOM from "react-dom";
import { Provider, Subscribe } from 'unstated'

import AppContainer from 'components/container'
import Status from 'components/status'
import Table from 'components/table'
import Input from 'components/input'

import "./styles.scss";
import { ICommits } from "services/interface";

function App(): JSX.Element {
  const handleChange = (e: any, container: AppContainer) => {
    const newRepo = e.target.value
    if (newRepo && newRepo.length) {
      container.fetchBranches(newRepo)
    }
  }
  const handleSearchChange = (e: any, container: AppContainer) => {
    const searchValue = e.target.value
    const filteredCommits = container.state.commits
    filteredCommits.filter((item: ICommits) => {
      return item.commit.message.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    })
    console.log(filteredCommits);
    container.setState({
      commits: filteredCommits
    })
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
                  text={`${(container.state.validRepo ? 'Current Repository:' : 'Invalid Repository:')} ${container.state.currentRepo}`}
                />
                <div className="repo-man">
                  <Input
                    container={container}
                    label="Repository Name"
                    className="repo-div"
                    debounce={1000}
                    placeHolder={container.state.currentRepo}
                    onChange={(event: Event) => handleChange(event, container)}
                  />
                  <Input
                    container={container}
                    label="Search Commit"
                    className="search-div"
                    debounce={1000}
                    placeHolder={container.state.currentRepo}
                    onChange={(event: Event) => handleSearchChange(event, container)}
                  />
                </div>
                <Table
                  data={container.state.commits}
                  getTdProps={(rowInfo: any, column: any) => {
                    return {
                      onClick: (e: Event, handleOriginal: any) => {
                        console.log('it produced this event:', e.target)
                        console.log('It was in this column:', column)
                        console.log('It was in this row:', rowInfo)
                        if (handleOriginal) {
                          // handleOriginal()
                        }
                      }
                    }
                  }}
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
