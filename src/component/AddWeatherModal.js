import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import { useWeather } from '../weatherContext/WeatherContext';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function AddWeatherModal({ show, handleClose }) {
  const API_KEY = 'bf4a75dc31cb09553139febe65dcd328';
  const cityRef = useRef();
  const { addReport } = useWeather();
  const notify = (err) => {
    toast.error(err, { position: toast.POSITION.TOP_CENTER });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityRef.current.value}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        addReport({
          name: cityRef.current.value,
          feels_like: response.data.main.feels_like,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          icon: response.data.weather[0].icon,
          weatherDescription: response.data.weather[0].description,
          weatherMain: response.data.weather[0].main
        });
        handleClose();
      })
      .catch((err) => {
        if (err.message.includes('400') || err.message.includes('404'))
          notify('Please enter a valid city name');
        else notify(err.message);
        handleClose();
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>Add Weather</Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3 d-flex align-items-center'>
            <Form.Label className='me-2 text-align-baseline font-weight-bold'>City</Form.Label>
            <Form.Control type='text' required ref={cityRef} />
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='outline-primary' type='submit'>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default AddWeatherModal;
