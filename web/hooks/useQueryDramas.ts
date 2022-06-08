import { useQuery } from 'react-query';
import axios from 'axios';
import { Drama } from '../types/drama';
import { useState } from 'react';

export const useQueryDramas = () => {
  const [dramas, setDramas] = useState([]);
  const getDramas = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_CORE_URL}/drama`).then((res) => {
      setDramas(res.data);
    });
    return dramas;
  };
  return useQuery<Drama[]>({
    queryKey: ['dramas'],
    queryFn: getDramas,
  });
};
