import React from 'react'
import Main from '../components/Main.jsx/Main'
import Row from '../components/Row/Row'
import request from '../Requests'

const Home = () => {
  return (
    <div>

    <Main />
    <Row rowID="1" title="UpComing" fetchURL={request.upComing}/>
    <Row rowID="2" title="topRated" fetchURL={request.topRated}/>
    <Row rowID="3" title="trending" fetchURL={request.trending}/>
    <Row rowID="4" title="nowPlaying" fetchURL={request.nowPlaying}/>
    <Row rowID="5" title="popular" fetchURL={request.popular}/>

    </div>
  )
}

export default Home