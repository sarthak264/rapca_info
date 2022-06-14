import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataProviderTypes } from '../types/DataProviderTypes';
import { AxiosInstance } from '../Utils/AxiosInstance';
import { Box, Button, AppBar, Tabs, Tab } from '@material-ui/core';
import { Loading } from 'react-admin';
import { RouteDefinitons } from '../Utils/RouteDefinitions';
import { TripPlan } from '../Components/TripPlan';
interface Props {}

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export const TripView = (props: Props) => {
  const history = useHistory();
  const { bmeId, tripId }: any = useParams();
  const [data, setData] = useState<{
    title: string;
    date: string;
    status: string;
    clients: {
      type: string;
      _id: string;
      name: string;
      allocation: {
        total_weight_kg: number;
      };
    }[];
    region: {
      title: string;
      tz: string;
    };
  } | null>(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const toastId = toast('Loading...', { autoClose: false });
    const tokenId = localStorage.getItem('firebaseToken');
    AxiosInstance.post('', {
      jsonrpc: '2.0+hl',
      id: 1,
      method: `jdr1:${DataProviderTypes.TRIP}:get`,
      params: { bme_id: bmeId, trip_id: tripId },
      auth: {
        type: 'gcloud_firebase',
        id_token: tokenId || '',
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        toast.update(toastId, {
          render: 'Something went wrong...',
          autoClose: 4000,
          type: 'error',
        });
      } else {
        setData(res.data.result);
        toast.update(toastId, {
          autoClose: 1,
          type: 'success',
        });
      }
    });
  }, []);
  if (!data) return <Loading />;
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <Box>
      <Box display={'flex'} justifyContent='space-between'>
        <Box>
          <p>
            <strong>Title: </strong>
            {data.title}
          </p>
          <p>
            <strong>Date: </strong>
            {data.date.split('T')[0]}
          </p>
          <p>
            <strong>Status: </strong>
            {data.status}
          </p>
        </Box>
        <Box>
          <Button
            variant='contained'
            color='primary'
            className='option-btn'
            onClick={() =>
              history.push(
                RouteDefinitons.ROUTE_TRIPS + '/' + bmeId + '/' + tripId
              )
            }
          >
            Edit
          </Button>
          <Button variant='contained' color='primary' className='option-btn'>
            Clone
          </Button>
          <Button variant='contained' color='primary' className='option-btn'>
            Cancel
          </Button>
        </Box>
      </Box>
      <Box marginTop={'30px'}>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
          >
            <Tab label='Clients' {...a11yProps(0)} />
            <Tab label='Plan' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {data.clients.map((el, index) => {
            return (
              <div className='list-item'>
                <h2>{el.name}</h2>
                <h2 className='ms-auto'>{el.allocation.total_weight_kg}</h2>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TripPlan />
        </TabPanel>
      </Box>
    </Box>
  );
};
