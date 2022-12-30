import {
  Container,
  HStack,
  Image,
  CardBody,
  Card,
  Stat,
  StatLabel,
  StatNumber,
  Heading
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../AxiosInstance';
import Loader from './Loader';
import Chart from "./Chart";

const CoinDetail = () => {
  // const [error, setError] = useState(false);
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loader, setLoader] = useState(false);
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);

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
      const { data } = await axios.get(
        `/coins/${id}/market_chart?vs_currency=inr&days=1`
      );
      const { prices: chartPrices } = data;
      for (let i = 0; i < chartPrices.length; i++) {
        let newPrices = prices;
        newPrices.push(chartPrices[i][1]);
        setPrices(newPrices);
        let newDates = dates;
        newDates.push(new Date(chartPrices[i][0]).toLocaleTimeString());
        setDates(newDates);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();
    fetchChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!coin) {
    return <Loader show={loader}></Loader>;
  }
  return (
    <Container maxW={'container.xl'} mb={'40'}>
      <Card mt={'10'}>
        <CardBody>
          <HStack justifyContent={'space-between'}>
            <Image src={coin.image.large} w={'20'} h={'20'}></Image>
            <Heading size={'2xl'} textTransform={'uppercase'}>{coin.name}</Heading>
            <HStack>
              <Stat mr={'10'}>
                <StatLabel>Today High</StatLabel>
                <StatNumber color={'green.500'}>{coin.market_data.high_24h['inr']}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Today Low</StatLabel>
                <StatNumber color={'red.500'}>{coin.market_data.low_24h['inr']}</StatNumber>
              </Stat>
            </HStack>
          </HStack>
        </CardBody>
      </Card>
      <Card mt={'10'}>
        <CardBody>
            <Chart id={coin.id} prices={prices} dates={dates}></Chart>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CoinDetail;
