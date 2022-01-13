import { useQuery } from 'react-query'
import { fetchCoinHistory } from '../api'
import ApexChart from 'react-apexcharts'

interface IHistorical
{
    time_open: string
    time_close: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    market_cap: number
}

interface CharProps
{
    coinId : string
}

function Chart({coinId} : CharProps)
{   
    const {isLoading, data} = useQuery<IHistorical[]>(['ohlcv' , coinId ],() => 
    fetchCoinHistory(coinId),
    {
        refetchInterval: 10000
    }) 
    return(
        <div>
            {isLoading ? '차트 로딩중...' : 
            <ApexChart 
            type='line'
            series=
            {
                [
                    {   name:'가격',
                        data: data?.map((price) => price.close)
                    },
                ]
            }
            options=
            {
                {
                theme:
                    {
                        mode: 'dark'
                    },

                chart: 
                    {
                        height: 500,
                        width: 500,
                        background: 'transparent',
                        animations: 
                        {
                            enabled: true,
                            easing: 'easeinout',
                            speed: 800,
                            animateGradually: 
                            {
                                enabled: true,
                                delay: 300
                            },
                            dynamicAnimation: 
                            {
                                enabled: true,
                                speed: 350
                            }
                        }
                    },
                stroke:
                    {
                        curve: 'smooth',
                        width: 3,

                    },
                grid:
                    {
                        show:false
                    },
                yaxis:
                    {
                        show:false
                    },
                xaxis:  
                    {   axisBorder:
                        {
                            show:false
                        },
                        axisTicks:
                        {
                            show:false
                        },
                        labels:
                        {
                            show:false
                        },
                        type:'datetime',
                        categories: data?.map((price) => price.time_close)
                    },
                fill:
                    {
                        type: 'gradient',
                        gradient:
                        {
                            gradientToColors:['#0be881'],
                            stops: [0, 100],
                        }

                    },
                colors:['#0fbcf9'],
                tooltip:
                    {
                        y:
                        {
                            formatter: (value) => `$${value.toFixed(2)}`
                        }
                    }
                        
                       
                }
            }
          />}
        </div>
    )
}

export default Chart