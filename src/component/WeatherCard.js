import React, { useState } from 'react';
import { Card, Stack, Collapse, CloseButton } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { useWeather } from '../weatherContext/WeatherContext';

function WeatherCard(props) {
  const [open, setOpen] = useState(false);
  const { deleteReport } = useWeather();
  console.log(props);
  let imageUrl = `http://openweathermap.org/img/w/${props.icon}.png`;
  const handleDelete = () => {
    deleteReport({ id: props.id });
    console.log('delete');
  };
  return (
    <Card lg={6}>
      <Card.Body>
        <CloseButton
          style={{ position: 'absolute', right: '0', top: '0' }}
          onClick={handleDelete}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card.Title>{capitalize(props.name)}</Card.Title>
          <img src={imageUrl} alt={'Image'}></img>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div> Feel Temp:{props.feels_like}&deg;C</div>
            <div>Temp:{props.temp}&deg;C</div>
          </div>
          <Collapse in={open}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>MAX:{props.temp_max}&deg;C</div>
                <div>MIN:{props.temp_min}&deg;C</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Pressure:{props.pressure}</div>
                <div>Humidity:{props.humidity}</div>
              </div>
            </div>
          </Collapse>
          <div
            onClick={() => setOpen(!open)}
            style={{ cursor: 'pointer', display: 'flex', alignSelf: 'end', marginTop: '0.5rem' }}>
            {open ? <span>Hide Details</span> : <span>Show Details</span>}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
