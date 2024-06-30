import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const useFetchData = (apiEndpoint, useMockData) => {
  const driversData = useSelector(state => state.drivers.drivers);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (useMockData) {
        setData(driversData);
      } else {
        try {
          const response = await axios.get(apiEndpoint, { responseType: 'json' });
          if (Array.isArray(response)) {
            setData(response);
          } else {
            throw new Error('Data received from the server is not in the expected format');
          }
        } catch (err) {
          console.error('Error fetching data from server:', err);
          setError('Error fetching data from server');
        }
      }
    };

    fetchData();
  }, [apiEndpoint, useMockData, driversData]);

  return { data, error };
};
