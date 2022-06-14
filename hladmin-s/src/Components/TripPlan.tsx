import { useEffect, useState } from 'react';
import { AxiosInstance } from '../Utils/AxiosInstance';
import { Card, Box } from '@material-ui/core';

export const TripPlan = (props: any) => {
  const tokenId = localStorage.getItem('firebaseToken');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    AxiosInstance.post('', {
      jsonrpc: '2.0+hl',
      id: 1,
      method: 'jdr1:trip:plan:get',
      params: {
        bme_id: '61c401c1be172a62aa0c6803',
        trip_id: '61c402ff9cf76bf34e0e8f03',
      },
      auth: {
        type: 'gcloud_firebase',
        id_token: tokenId || '',
      },
    }).then((res) => {
      console.log(res.data.result.clients);
      setData(res.data.result.clients);
    });
  }, []);
  return (
    <>
      {data.map((el, id) => {
        console.log(el);
        return (
          <Card
            key={id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              padding: '1rem 1.5rem',
            }}
          >
            <h2 style={{ margin: '0' }}>{el.name}</h2>
            <Box sx={{ display: 'flex' }}>
              <Box className='weight' sx={{ marginRight: '2rem' }}>
                <h3 style={{ marginTop: '0' }}>Weight</h3>
                {el.allocations.map((allocation: any, id: number) => {
                  return <p>{allocation.total_weight_kg}</p>;
                })}
              </Box>
              <div className='date'>
                <h3 style={{ marginTop: '0' }}>Date</h3>
                {el.allocations.map((allocation: any, id: number) => {
                  return <p>{allocation.datetime}</p>;
                })}
              </div>
            </Box>
          </Card>
        );
      })}
    </>
  );
};
