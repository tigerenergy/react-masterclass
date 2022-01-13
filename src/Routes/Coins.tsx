import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchCoins } from '../api'
import { Helmet } from 'react-helmet'


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  background: #131419;
  border-radius: 5px;
  text-align: center;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  box-shadow: inset -2px -2px 6px rgba(0, 0, 0, 1),
  inset 2px 2px 6px rgba(255, 255, 255, 0.05);
  background: #131419;
  border-radius: 8px;
  margin-bottom: 10px;
  height: 6vh;
  text-align: center;
  a {
    transition: color 0.2s ease-in;
    display: block;
    display: flex;
    align-items: center;
  }
  &:hover 
  {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8);
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
  &:active
  {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8);
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`

const Loader = styled.div
`
  text-align: center;
  
`

const Img = styled.img
`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  margin-top: 10px;
`

interface ICoin
{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}


function Coins() 
{ 
  const {isLoading, data} = useQuery<ICoin[]>('allCoins' , fetchCoins)
  return (
    <Container>
      <Helmet>
      <title>CryptoCurrency</title>
      </Helmet>
    <Header>
    <Title>CryptoCurrency</Title>
    </Header>
    {isLoading ? (
      <Loader>로딩중...</Loader>
    ) : (
      <CoinsList>
         {data?.slice(0 ,100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  )
}
export default Coins;