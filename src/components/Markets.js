import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Row, Form, Spinner } from 'react-bootstrap'
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

import {API_URL, coinList } from './Dash'

const Markets = () => {
    let initialState = {art: null, aNEAR: null, aBTC: null, aGOLD: null, aSPY: null, aEUR: null,
      aGOOG: null, aTSLA: null, aNFLX: null, aAAPL: null, aFB: null}
    const [month, setMonth] = useState(initialState)
    const [week, setWeek] = useState(initialState)
    const [day, setDay] = useState(initialState)

    const getPriceList = async () => {
        let monthlyPriceList = {art: null, aNEAR: null, aBTC: null, aGOLD: null, aSPY: null, aEUR: null,
          aGOOG: null, aTSLA: null, aNFLX: null, aAAPL: null, aFB: null}
        let weeklyPriceList = {art: null, aNEAR: null, aBTC: null, aGOLD: null, aSPY: null, aEUR: null,
          aGOOG: null, aTSLA: null, aNFLX: null, aAAPL: null, aFB: null}
        let dailyPriceList = {art: null, aNEAR: null, aBTC: null, aGOLD: null, aSPY: null, aEUR: null,
          aGOOG: null, aTSLA: null, aNFLX: null, aAAPL: null, aFB: null}

        for(const p in monthlyPriceList){
            let res1 = await fetch(`${API_URL}/${p}/1M`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            res1 = await res1.json()
            monthlyPriceList[p] = res1
        }

        for(const p in weeklyPriceList){
            let res2 = await fetch(`${API_URL}/${p}/1W`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            res2 = await res2.json()
            weeklyPriceList[p] = res2
        }

        for(const p in dailyPriceList) {
            let res3 = await fetch(`${API_URL}/${p}/1D`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            res3 = await res3.json()
            dailyPriceList[p] = res3
        }

        setMonth(monthlyPriceList)
        setWeek(weeklyPriceList)
        setDay(dailyPriceList)
    }

    const getPrice = (array) => {
      return array.map((arr) => arr.price.toFixed(2))
    }

    const getDate = (array) => {
        return array.map((arr) => arr.time)
    }

    useEffect(() => {
      async function fetchData() {
        await getPriceList()
      }
      fetchData()
    }, [])

    const getOption = (title, data, date) => {
      return {
        title: {
          text: title,
          textStyle: {
              fontWeight: 'bolder',
              fontSize: 20
          }
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: date,
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              lineStyle: {
                color: "white",
              },
            },
            axisLabel : {
              formatter: function (value) {
                  return value > 1000 ? value/1000 + 'k' : value
              }
            },
            min: function (value) {
              return value.min - value.min * 0.02;
            }
          },
        ],
        series: [
          {
            name: "Price: ",
            type: "line",
            lineStyle: {
              color: "#9c87f7",
              width: 1,
            },
            symbol: 'none',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(207, 196, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(236, 232, 255, 0.1)",
                },
              ]),
            },
            data: data,
          },
        ],
      };
  };
    
    const Charts = ({index}) => {
      return  (
        <Tabs defaultActiveKey="daily" id="price">
          <Tab eventKey="daily" title="1 Day">
            <ReactEcharts
              option={getOption( index + ' / aUSD', getPrice(day[index]), getDate(day[index]))}
              style={{width: '100%', height: '500px'}}
            />
          </Tab>
          <Tab eventKey="week" title="1 Week">
            <ReactEcharts
              option={getOption( index + ' / aUSD', getPrice(week[index]), getDate(week[index]))}
              style={{width: '100%', height: '780px'}}
            />
          </Tab>
          <Tab eventKey="month" title="1 Month">
            <ReactEcharts
              option={getOption( index + ' / aUSD', getPrice(month[index]), getDate(month[index]))}
              style={{width: '100%', height: '780px'}}
             />
          </Tab>
        </Tabs>
    );
    }

    const assetItems = coinList.map((k) =>
        <option key={k}>
            {k}
        </option>
    )

    const [currentAsset, setCurrentAsset] = useState('art')

    return (
        <>
        <Row noGutters className="p-2" style={{background: '#fff'}}>
            <Form.Group controlId="formSelect">
                <Form.Control 
                    value={currentAsset} 
                    as="select" 
                    onChange={(event) => {
                        if (event) {
                            const value = event.target !== null ? event.target.value : "";
                            setCurrentAsset(value)
                        }
                    }}>
                    {assetItems}
                </Form.Control>
            </Form.Group>
        </Row>
        {day.art !== null ?
        <div>
          <Charts index={currentAsset} />
        </div>
        : <Row className="m-2 p-2">
            <Spinner animation="border" style={{fontSize: "3rem", width: '3rem', height: '3rem'}}/>
            <Spinner animation="border" style={{fontSize: "3rem", width: '3rem', height: '3rem'}}/>
            <Spinner animation="border" style={{fontSize: "3rem", width: '3rem', height: '3rem'}}/>
          </Row>
        }    
        </>
    )
}

export default Markets

