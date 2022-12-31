import {
  Container,
  HStack,
  Image,
  CardBody,
  Card,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  Stack,
  Box,
  Button,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../AxiosInstance';
import Loader from './Loader';
import Chart from './Chart';
import ThemeContext from "../ThemeContext";

const CoinDetail = () => {
  // const [error, setError] = useState(false);
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loader, setLoader] = useState(false);
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);
  const [days, setDays] = useState(1);
  const colorScheme = useContext(ThemeContext);

  const fetchCoin = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`/coins/${id}`);
      setCoin(data);
      setLoader(false);
      // console.log(coin);
    } catch (error) {
      setLoader(false);
    }
  };
  const fetchChart = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `/coins/${id}/market_chart?vs_currency=inr&days=${days}`
      );
      const { prices: chartPrices } = data;
      let newPrices = [];
      let newDates = [];
      for (let i = 0; i < chartPrices.length; i++) {
        newPrices.push(chartPrices[i][1]);
        if (days === 1) {
          newDates.push(new Date(chartPrices[i][0]).toLocaleTimeString());
        } else {
          newDates.push(new Date(chartPrices[i][0]).toLocaleDateString());
        }
      }
      setPrices(newPrices);
      setDates(newDates);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const changeDay = day => {
    setDays(day);
  };

  useEffect(() => {
    fetchCoin();
    fetchChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  if (!coin || loader) {
    return <Loader show={loader}></Loader>;
  }
  return (
    <Container maxW={'container.xl'} mb={'40'}>
      <Card mt={'2'}>
        <CardBody>
          <Stack direction={['column', 'row']} justifyContent={'space-between'}>
            <Stack direction={['column', 'row']}>
              <Box>
                <Image src={coin.image.large} w={'20'} h={'20'}></Image>
                <Heading size={'2xl'} textTransform={'uppercase'}>
                  {coin.name}
                </Heading>
              </Box>
            </Stack>
            <Stack justifyContent={'space-evenly'} direction={['column', 'row']}>
              <Stat>
                <StatLabel>Current Price</StatLabel>
                <StatNumber color={'blue.500'}>
                  {coin.market_data.current_price['inr']}
                </StatNumber>
              </Stat>
              <Stat mr={'2'}>
                <StatLabel>Today High</StatLabel>
                <StatNumber color={'green.500'}>
                  {coin.market_data.high_24h['inr']}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Today Low</StatLabel>
                <StatNumber color={'red.500'}>
                  {coin.market_data.low_24h['inr']}
                </StatNumber>
              </Stat>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
      <Box my={'5'}>
        <HStack justifyContent={'center'}>
          <Button colorScheme={colorScheme} onClick={() => changeDay(1)}>
            1D
          </Button>
          <Button colorScheme={colorScheme} onClick={() => changeDay(30)}>
            1M
          </Button>
          <Button colorScheme={colorScheme} onClick={() => changeDay(365)}>
            1Y
          </Button>
          <Button colorScheme={colorScheme} onClick={() => changeDay('max')}>
            MAX
          </Button>
        </HStack>
      </Box>
      <Card>
        <CardBody>
          <Chart id={coin.id} prices={prices} dates={dates}></Chart>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CoinDetail;
