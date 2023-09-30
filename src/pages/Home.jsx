import React from 'react'
import Main from '../components/Main.jsx/Main'
import Row from '../components/Row/Row'
import request from '../Requests'

const Home = () => {
  return (
    <div>

    <Main />
    <Row title="UpComing" fetchURL={request.upComing}/>
    <Row title="topRated" fetchURL={request.topRated}/>
    <Row title="trending" fetchURL={request.trending}/>
    <Row title="nowPlaying" fetchURL={request.nowPlaying}/>
    <Row title="popular" fetchURL={request.popular}/>

    </div>
  )
}

export default Home