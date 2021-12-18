import React from 'react'
import _ from 'lodash'
import './App.css'
import classNames from 'classnames'
import data from './examinations.json'

const images: Array<Image> = []
data.examinations.forEach((examination: any) => {
  examination.images.forEach((image: any) => {
    images.push({
      ...image,
      date: examination.date,
    })
  })
})

// TODO: flatten the array so dates is on each. Then a simple groupBy will do the trick

interface Image {
  date: string
  eye: string
  modality: string
  note: string
  thumbnail: string
}

interface Examination {
  date: string
  images: Array<Image>
}

function Card(props: any) {
  const image: Image = props.image
  return (
    <div className="col-md-4">
      <img src={process.env.PUBLIC_URL + image.thumbnail} />
      <div>Eye: {image.eye}</div>
      <div>Modality: {image.modality}</div>
      <div>Note: {image.note}</div>
    </div>
  )
}

function App() {
  const [group, setGroup] = React.useState<string>('date')
  const [grouped, setGrouped] = React.useState<any>(_.groupBy(images, group))
  React.useEffect(() => {
    setGrouped(_.groupBy(images, group))
  }, [group])
  const filterClass = (field: string) => {
    const active = field === group
    return classNames({
      btn: true,
      'btn-default': !active,
      'btn-primary': active,
    })
  }
  return (
    <div className="App container">
      <div className="btn-group">
        <div className={filterClass('date')} onClick={() => setGroup('date')}>
          Date
        </div>
        <div
          className={filterClass('modality')}
          onClick={() => setGroup('modality')}
        >
          Modality
        </div>
        <div className={filterClass('eye')} onClick={() => setGroup('eye')}>
          Eye
        </div>
      </div>

      {Object.keys(grouped).map((key: string) => {
        return (
          <div className="row">
            <div className="col-12">
              <h2>{key}</h2>
            </div>
            {grouped[key].map((image: Image) => (
              <Card image={image} />
            ))}
          </div>
        )
      })}
      <pre>{JSON.stringify(grouped, null, 2)}</pre>
    </div>
  )
}

export default App
