import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import AddWeatherModal from './component/AddWeatherModal';
import WeatherCard from './component/WeatherCard';
import { useWeather } from './weatherContext/WeatherContext';
function App() {
  const [showAddWeatherModal, setShowAddWeatherModal] = useState(false);
  const { report } = useWeather();
  return (
    <Container className='my-4'>
      <Stack direction='horizontal' gap='2'>
        <h1 className='me-auto'>Weather App</h1>
        {console.log(report)}
        <Button onClick={() => setShowAddWeatherModal(true)} variant='outline-secondary'>
          Add
        </Button>
      </Stack>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill),minmax(300px,1fr)',
          gap: '2rem',
          alignItems: 'flex-start',
          marginTop: '2rem'
        }}>
        {report.map((weather) => (
          <WeatherCard key={weather.id} {...weather} />
        ))}
      </div>
      {showAddWeatherModal && (
        <AddWeatherModal
          show={showAddWeatherModal}
          handleClose={() => setShowAddWeatherModal(false)}
        />
      )}
    </Container>
  );
}

export default App;
