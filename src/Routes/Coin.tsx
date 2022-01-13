import { Link } from 'react-router-dom'
import { Switch, Route, useLocation, useParams, useRouteMatch  } from 'react-router'
import styled from 'styled-components'
import Chart from './Chart'
import Price from './Price'
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api'
import { Helmet } from 'react-helmet'

const Container = styled.div
`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  height: 100vh;
  background: #131419;;
`

const Header = styled.header
`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader = styled.div
`
  text-align: center;
`
const Title = styled.h1
`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  text-transform: uppercase;
`

const Overview = styled.div
`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: inset -2px -2px 6px rgba(0, 0, 0, 1),
  inset 2px 2px 6px rgba(255, 255, 255, 0.05);
  background: #131419;
  border-radius: 8px;
  margin-bottom: 10px;
  height: 30vh;
`

const OverviewItem = styled.div
`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child 
  {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`
const Description = styled.p
`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: inset -2px -2px 6px rgba(0, 0, 0, 1),
  inset 2px 2px 6px rgba(255, 255, 255, 0.05);
  background: #131419;
  border-radius: 8px;
  height: 10vh;
  
`
const Tabs = styled.div
`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  margin:20px;
  gap: 10px;
  
  
`

const Tab = styled.span<{ isActive: boolean}>
`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background: #131419;
  box-shadow: inset -2px -2px 6px rgba(0, 0, 0, 1),
  inset 2px 2px 6px rgba(255, 255, 255, 0.05);
  padding: 7px 0px;
  border-radius: 8px;
  &:hover 
  {
    color: ${(props) => props.theme.accentColor};
    transition: color 0.2s ease-in-out;
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8);
  }
  &:active
  {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8);
  }
  a
  {
    display: block;
  }
`

const Home = styled.div
`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background: #131419;
  box-shadow: inset -2px -2px 6px rgba(0, 0, 0, 1),
  inset 2px 2px 6px rgba(255, 255, 255, 0.05);
  padding: 7px 0px;
  border-radius: 8px;
  &:hover 
  {
    color: ${(props) => props.theme.accentColor};
    transition: color 0.2s ease-in-out;
  }
  &:active
  {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8);
  }
  a {
    display: block;
  }
`



interface RouteParams 
{
  coinId: string
}

interface RouteState 
{
  name: string
}



interface InfoData
{
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
  description: string
  message: string
  open_source: boolean
  started_at: string
  development_status: string
  hardware_wallet: boolean
  proof_type: string
  org_structure: string
  hash_algorithm: string
  first_data_at: string
  last_data_at: string
}

interface PriceData
{

  id:  string
  name:  string
  symbol:  string
  rank:  number
  circulating_supply:  number
  total_supply:  number
  max_supply:  number
  beta_value:  number
  first_data_at:  string
  last_updated:  string
  quotes: 
  {
    USD:
    {
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number 
      percent_change_1h: number  
      percent_change_1y: number  
      percent_change_6h: number
      percent_change_7d: number 
      percent_change_12h: number
      percent_change_15m: number 
      percent_change_24h: number 
      percent_change_30d: number  
      percent_change_30m: number
      percent_from_price_ath:number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  }

}

function Coin() {
  const { coinId } = useParams<RouteParams>()
  const {state} = useLocation<RouteState>()
  const priceMatch = useRouteMatch('/:coinId/price')
  const chartMatch = useRouteMatch('/:coinId/chart')
  

  const { isLoading: infoLoading , data: infoData } = 
  useQuery<InfoData>(['info',coinId] , 
  ()=> fetchCoinInfo(coinId))

  const { isLoading: tickersLoading , data: tickersData} = 
  useQuery<PriceData>(['tickers',coinId] , 
  ()=> fetchCoinTickers(coinId),
  {
    refetchInterval: 5000,
  })

  const loading = infoLoading || tickersLoading
  return(
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
      <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        </Header>
      {loading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>랭크:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>가격:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>전체공급:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대공급:</span>
              <span>{tickersData?.max_supply}</span>
              </OverviewItem>
              <OverviewItem>
              <span>ATH가격:</span>
              <span>${tickersData?.quotes.USD.ath_price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description.slice(0 ,200)}</Description>
          <Tabs>
          <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>차트보기</Link>
          </Tab>
          <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>가격보기</Link>
          </Tab>
          <Home>
          <Link to="/">뒤로가기</Link>
        </Home>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
            <Price coinId={coinId}/>
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin