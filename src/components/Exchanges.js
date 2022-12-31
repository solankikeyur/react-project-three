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
import Error from "./Error";
import ThemeContext from "../ThemeContext"

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const colorScheme = useContext(ThemeContext);

  const fetchExchanges =  async () => {
    try {
      setLoader(true);
      const { data } = await AxiosInstance.get(
        `/exchanges?per_page=50&page=${page}`
      );
      if (data.length > 0) {
        setExchanges(exchanges.concat(data));
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
    document.title = "Exchanges";
    fetchExchanges();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  if(error) {
    return <Error message={"Something went wrong. Please try again later."}></Error>
  }
  if (exchanges.length === 0) {
    return <Loader show={loader}></Loader>;
  }
  
  return (
    <Container maxW={'container.xl'}>
      <InfiniteScroll
        dataLength={exchanges.length} //This is important field to render the next data
        next={fetchExchanges}
        hasMore={hasMore}
        loader={<Loader show={loader}></Loader>}
      >
        <HStack
          mt={'1'}
          wrap={'wrap'}
          justifyContent={'space-evenly'}
          mb={'40'}
        >
          {exchanges.map(exchange => (
            <Exchange
              key={exchange.id}
              name={exchange.name}
              image={exchange.image}
              id={exchange.id}
              url={exchange.url}
              colorScheme={colorScheme}
            ></Exchange>
          ))}
        </HStack>
      </InfiniteScroll>
    </Container>
  );
};

const Exchange = ({ name, image, url, colorScheme }) => {
  return (
    <VStack>
      <a href={url} target={'target'}>
        <Card
          mt={'6'}
          w={'52'}
          // colorScheme={'green'}
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
            </VStack>
          </CardBody>
        </Card>
      </a>
    </VStack>
  );
};

export default Exchanges;
