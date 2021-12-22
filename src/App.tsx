import './App.css'
import Fuse from 'fuse.js'
import Image from './Image'
import ImageCard from './ImageCard'
import React from 'react'
import classNames from 'classnames'
import eyeLabel from './eyeLabel'
import formatDate from './formatDate'
import data from './data.json'
import { groupBy } from 'lodash'

function App() {
  const [images, setImages] = React.useState<Array<Image>>(data)
  const [group, setGroup] = React.useState<string>('date')
  const [grouped, setGrouped] = React.useState<any>(groupBy(images, group))
  const [filter, setFilter] = React.useState<string>('')
  const groupKeys = ['date', 'modality', 'eye']

  React.useEffect(() => {
    setFilter('')
    setGrouped(groupBy(images, group))
  }, [group, images])

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

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value
    if (!term) {
      setImages(data)
      return
    }
    const fuse = new Fuse(data, {
      keys: ['note'],
      threshold: 0.5,
    })
    const results = fuse.search(term).map((d) => d.item)
    setImages(results)
  }

  return (
    <div className="App p-4 bg-light bg-gradient">
      <div className="row">
        <div className="col-md-3 col-xl-2">
          <h4>Search</h4>
          <div className="mb-5">
            <input type="text" onChange={search} placeholder="Search notes..." />
          </div>

          <h4>Group</h4>
          <div className="list-group mb-5">
            {groupKeys.map((key: string) => (
              <button
                className={groupClass(key)}
                onClick={() => setGroup(key)}
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
                  <h3 className="mb-2 text-capitalize card-header">
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
