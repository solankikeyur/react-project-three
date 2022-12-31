import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  Image,
  VStack,
} from '@chakra-ui/react';
import AxiosInstance from '../AxiosInstance';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader';
import Error from './Error';
import { Link } from 'react-router-dom';
import ThemeContext from "../ThemeContext"

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const colorScheme = useContext(ThemeContext);

  const fetchCoins = async () => {
    try {
      setLoader(true);
      const { data } = await AxiosInstance.get(
        `/coins/markets?vs_currency=inr&per_page=50&page=${page}`
      );
      if (data.length > 0) {
        setCoins(coins.concat(data));
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      setLoader(false);
    } catch (error) {
      setError(true);
      setLoader(false);
    }
  };

  useEffect(() => {
    document.title = 'Coins';
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    return (
      <Error message={'Something went wrong. Please try again later.'}></Error>
    );
  }
  if (coins.length === 0) {
    return <Loader show={loader}></Loader>;
  }

  return (
    <Container maxW={'container.xl'}>
      <InfiniteScroll
        dataLength={coins.length} //This is important field to render the next data
        next={fetchCoins}
        hasMore={hasMore}
        loader={<Loader show={loader}></Loader>}
      >
        <HStack
          mt={'1'}
          wrap={'wrap'}
          justifyContent={'space-evenly'}
          mb={'40'}
        >
          {coins.map(coin => (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              id={coin.id}
              price={coin.current_price}
              colorScheme={colorScheme}
            ></Coin>
          ))}
        </HStack>
      </InfiniteScroll>
    </Container>
  );
};

const Coin = ({ name, image, price, id , colorScheme}) => {
  return (
    <VStack>
      <Link to={`/coin/${id}`} >
        <Card
          mt={'6'}
          w={'52'}
          shadow={'lg'}
          _hover={{
            bgColor: `${colorScheme}.100`,
            color: `${colorScheme}.500`,
          }}
        >
          <CardBody>
            <VStack mt={'6'}>
              <Image src={image}></Image>
              <Heading size={'sm'} noOfLines={'1'}>
                {name}
              </Heading>
              <Heading size={'xs'}>{price} INR</Heading>
            </VStack>
          </CardBody>
        </Card>
      </Link>
    </VStack>
  );
};

export default Coins;
