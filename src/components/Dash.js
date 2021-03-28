import React, {useEffect, useState} from 'react'

const Dash = () => {
    const coinList = ['art', 'aNEAR', 'aBTC', 'aGOLD', 'aSPY', 'aEUR']
    const [month, setMonth] = useState({art: null, aNEAR: null, aBTC: null, aGOLD: null, aSPY: null, aEUR: null})
    const [week, setWeek] = useState({art: null, aNEAR: null, aBTC: null, aGOLD: null, aSPY: null, aEUR: null})
    const [day, setDay] = useState({art: null, aNEAR: null, aBTC: null, aGOLD: null, aSPY: null, aEUR: null})

    const getPrice = async () => {
        let monthlyPriceList = new Array(coinList.length)
        let weeklyPriceList = new Array(coinList.length)
        let dailyPriceList = new Array(coinList.length)
        for(let i=0;i<coinList.length;i++){
            let res1 = await fetch(`http://35.236.75.242:3000/prices/${coinList[i]}/1M`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            res1 = await res1.json()
            monthlyPriceList[i] = res1
        }
        for(let i=0;i<coinList.length;i++){
            let res2 = await fetch(`http://35.236.75.242:3000/prices/${coinList[i]}/1W`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            res2 = await res2.json()
            weeklyPriceList[i] = res2
        }
        for(let i=0;i<coinList.length;i++){
            let res3 = await fetch(`http://35.236.75.242:3000/prices/${coinList[i]}/1D`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            res3 = await res3.json()
            dailyPriceList[i] = res3
        }
    }
    useEffect(async () => {
        await getPrice()
    })

    return <div>
        <h3 style={{padding: '5px 5%'}}> aUSD, the first decentralized native stable coin on NEAR and a defi asset exchange like Synthetix, that can trade virtual assets like BTC, Gold, EUR and S&P500 Index </h3>
        
    </div>
}

export default Dash

