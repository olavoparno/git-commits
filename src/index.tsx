import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, Subscribe } from 'unstated'

import { ICommits } from 'services/interface';

import AppContainer from 'components/container'
import Combo from 'components/combobox'
import Input from 'components/input'
import Status from 'components/status'
import Table from 'components/table'

import './styles.scss';

function App(): JSX.Element {
  const handleChange = (e: any, container: AppContainer) => {
    const newUser = e.target.value
    if (newUser && newUser.length) {
      container.fetchRepos(newUser)
    }
  }
  const handleSearchChange = async (e: any, container: AppContainer) => {
    const searchValue = e.target.value

    if (searchValue.length === 0) {
      const oldCommits = container.state.lastCommits
      await container.setState({
        commits: oldCommits,
      })
    }

    const filteredCommits = container.state.commits.filter((item: ICommits) => {
      return item.commit.message.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    })

    container.setState({
      commits: filteredCommits
    })
  }
  const handleRepoChange = async (e: any, container: AppContainer) => {
    await container.fetchBranches(e.label)
  }
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {
          (container: AppContainer) => {
            const isLoading = container.state.isLoading && container.state.currentRepo.label === ''
            return !isLoading ? (
              <div className="app-container">
                <Status
                  className="status-display"
                  text={`${(container.state.validRepo ? 'Current Repository:' : 'Invalid Repository:')} ${container.state.currentRepo.label}`}
                />
                <Input
                  container={container}
                  label="Username"
                  className="repo-div"
                  debounce={1000}
                  placeHolder={container.state.userName}
                  onChange={(event: Event) => handleChange(event, container)}
                />
                <div className="repo-man">
                  <Combo
                    label="Repositories"
                    className="combo-div"
                    value={container.state.currentRepo}
                    options={container.state.userRepos}
                    onChange={(event: Event) => handleRepoChange(event, container)}
                  />
                  <Input
                    container={container}
                    label="Search Commit"
                    className="search-div"
                    debounce={1000}
                    placeHolder={"e.g. refactor"}
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
