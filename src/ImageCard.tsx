import React from 'react'
import Image from './Image'
import classNames from 'classnames'
import eyeLabel from './eyeLabel'

export default function Card(props: any) {
  const [fullscreen, setFullscreen] = React.useState<boolean>(false)
  const image: Image = props.image

  const onKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      setFullscreen(false)
    }
  }

  // Exit fullscreen on escape keypress
  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  return (
    <div className={classNames({ fullscreen })} role="listitem">
      <div className={classNames({ card: true, 'h-100': !fullscreen })} onKeyDown={onKeyDown}>
        <img
          className={classNames({
            link: true,
            'card-image-top': !fullscreen,
            // 'order-last': fullscreen,
          })}
          role="button"
          src={process.env.PUBLIC_URL + image.thumbnail}
          alt={eyeLabel(image.eye) + ' | ' + image.modality + ' | ' + image.date}
          onClick={() => setFullscreen(!fullscreen)}
        />
        <div className="card-body">
          {fullscreen && (
            <button
              type="button"
              className="btn-close position-absolute end-0"
              aria-label="Close"
              onClick={() => setFullscreen(false)}
            ></button>
          )}
          <h5 className="card-title">
            <span className="d-inline-block pr-2 border-right mr-2">{image.modality}</span>
            <span className="color-light-grey"> | </span>
            {eyeLabel(image.eye)}
          </h5>
          <p className="card-text">{image.date}</p>
          <p className="card-text">{image.note}</p>
        </div>
      </div>
    </div>
  )
}
