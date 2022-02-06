import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import UseLocalStorage from '../hooks/UseLocalStorage';

const WeatherContext = React.createContext();

export function useWeather() {
  return useContext(WeatherContext);
}

export const WeatherContextProvider = ({ children }) => {
  const [report, setReport] = UseLocalStorage('report', []);
  function addReport({
    name,
    feels_like,
    humidity,
    pressure,
    temp,
    temp_max,
    temp_min,
    icon,
    weatherDescription,
    weatherMain
  }) {
    setReport((prevReport) => {
      if (prevReport.find((r) => r.name === name)) return prevReport;
      return [
        ...prevReport,
        {
          id: uuidV4(),
          name,
          feels_like,
          humidity,
          pressure,
          temp,
          temp_max,
          temp_min,
          icon,
          weatherDescription,
          weatherMain
        }
      ];
    });
  }
  function getReport({ id }) {
    return report.filter((report) => report.id === id);
  }
  function deleteReport({ id }) {
    setReport((prevReport) => prevReport.filter((report) => report.id !== id));
  }
  return (
    <WeatherContext.Provider value={{ report, addReport, getReport, deleteReport }}>
      {children}
    </WeatherContext.Provider>
  );
};
