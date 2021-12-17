import React from "react";
import "./App.css";
import data from "./examinations.json";
const examinations: Array<Examination> = data.examinations;

interface Image {
  eye: string;
  modality: string;
  note: string;
  thumbnail: string;
}

interface Examination {
  date: string;
  images: Array<Image>;
}

function App() {
  return (
    <div className="App container">
      <h1>Examinations</h1>
      <div className="btn-group" hidden>
        <div className="btn btn-primary">Modality</div>
        <div className="btn btn-default">Other</div>
      </div>

      {examinations.map((examination: Examination) => {
        return (
          <div className="row">
            <div className="col-12">
              <h2>{examination.date}</h2>
            </div>
            {examination.images.map((image: Image) => {
              return (
                <div className="col-md-4">
                  <img src={process.env.PUBLIC_URL + image.thumbnail} />
                  <div>Eye: {image.eye}</div>
                  <div>Modality: {image.modality}</div>
                  <div>Note: {image.note}</div>
                </div>
              );
            })}
          </div>
        );
      })}
      <pre>{JSON.stringify(examinations, null, 2)}</pre>
    </div>
  );
}

export default App;
