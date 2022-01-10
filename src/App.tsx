import './App.css'
import Image from './Image'
import ImageCard from './ImageCard'
import React from 'react'
import classNames from 'classnames'
import eyeLabel from './eyeLabel'
import formatDate from './formatDate'
import images from './data.json'
import { groupBy } from 'lodash'

function App() {
  const [group, setGroup] = React.useState<string>('date')
  const [grouped, setGrouped] = React.useState<any>(groupBy(images, group))
  const [filter, setFilter] = React.useState<string>('')
  const groupKeys = ['date', 'modality', 'eye']

  const changeGroup = (group: any) => {
    setGroup(group)
    setFilter('')
    setGrouped(groupBy(images, group))
  }

  const groupClass = (field: string) => {
    const active = field === group
    return classNames({
      'list-group-item': true,
      'list-group-item-action': true,
      'text-capitalize': true,
      active,
    })
  }

  const filterClass = (key: string) => {
    const active = filter === key
    return classNames({
      'list-group-item': true,
      'list-group-item-action': true,
      active,
    })
  }

  return (
    <div className="App p-4 bg-light bg-gradient">
      <div className="row">
        <div className="col-md-3 col-xl-2">
          <h4>Group</h4>
          <div className="list-group mb-5">
            {groupKeys.map((key: string) => (
              <button
                className={groupClass(key)}
                onClick={() => changeGroup(key)}
                key={'group-toggle-' + key}
              >
                {key}
              </button>
            ))}
          </div>
          <h4>Filter</h4>
          <div className="list-group mb-5">
            <button className={filterClass('')} onClick={() => setFilter('')}>
              Show All
            </button>
            {Object.keys(grouped).map((key: string) => {
              return (
                <button
                  className={filterClass(key)}
                  onClick={() => setFilter(key)}
                  key={'filter-' + key}
                >
                  {key}
                </button>
              )
            })}
          </div>
        </div>
        <div className="col-md-9 col-xl-10">
          {Object.keys(grouped)
            .filter((key) => !filter || filter === key)
            .map((key: string) => {
              return (
                <div className="card mb-5" key={'group-' + key}>
                  <h3 className="mb-2 text-capitalize card-header bg-dark text-white">
                    {group === 'date' ? formatDate(key) : ''}
                    {group === 'modality' && 'Modality: ' + key}
                    {group === 'eye' && eyeLabel(key)}
                  </h3>
                  <div className="row card-body" role="list">
                    {grouped[key].map((image: Image, i: number) => (
                      <div className="col-md-6 col-lg-4 col-xl-3" key={'card-' + i}>
                        <ImageCard image={image} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default App
