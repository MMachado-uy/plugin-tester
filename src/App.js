import { useState, useRef, useEffect } from 'react';
import { IframeBridge } from 'wisper-rpc';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import Warning from './components/Warning/Warning';
import Screen from './components/Screen/Screen';
import Events from './components/Events';

// import {
//   dismissWarning,
//   hasArleadyDismissed
// } from './helpers/utils';

import './App.scss';

function App() {
  const [ url, setUrl ] = useState('');
  const [ load, setLoad ] = useState(false);
  const [ bridge, setBridge ] = useState(null);
  const [ eventStack, setEventStack ] = useState([]);
  const screenContainer = useRef(null);

  useEffect(() => {
    if (url && load && !!screenContainer.current) {
      setBridge(new IframeBridge(document.querySelector('iframe').contentWindow));    
    }
  }, [url, load, screenContainer])
  
  useEffect(() => {
    if (bridge) {
      bridge.exposeFunction('onPlay', onPlay);
      bridge.exposeFunction('onDone', onDone);
      bridge.exposeFunction('onReady', onReady);
      bridge.exposeFunction('onError', onError);
      bridge.exposeFunction('teslaCacheX', teslaCacheX);
    }
  }, [bridge]);

  const onReady = payload => {
    console.log('calling onReady with: ', payload);
    newEvent('calling onReady with: ', payload);
  }

  const onPlay = payload => {
    console.log('calling onPlay with: ', payload);
    newEvent('calling onPlay with: ', payload);
  }
  
  const onDone = payload => {
    console.log('calling onDone with: ', payload);
    newEvent('calling onDone with: ', payload);
  };
  
  const onError = error => {
    console.log('calling onError with: ', error);
    newEvent('calling onError with: ', error);
  };
  
  const teslaCacheX = payload => {
    console.log('calling teslaCacheX with: ', payload);
    newEvent('calling teslaCacheX with: ', payload);

    return payload;
  };

  const play = () => {
    if (!bridge) {
      alert('Set a url first');
      return;
    }

    bridge.invoke('play').then(res => {
      console.log('play received with: ', res);
    });
  };

  const newEvent = (event, extra) => {
    setEventStack(eventStack => [...eventStack,{event, extra}]);
  };

  const loadHandler = () => {
    setLoad(!load);

    newEvent('load');
  }

  return (
    <div className='App'>
      {/* {!hasArleadyDismissed() && <Warning dismiss={dismissWarning}/>} */}
      <Container fluid>
        <Row>
          <Col>
            Plugin Tester v0.1
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <input 
                  type='url' 
                  name='url' 
                  placeholder='https://example.com' 
                  pattern='https://.*'
                  onChange={event => setUrl(event.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <button 
                  variant='primary'
                  onClick={loadHandler}
                >
                  {load ? 'Unload' : 'Load'} URL!
                </button>
                <button 
                  variant='primary'
                  onClick={() => play()}
                >
                  Play
                </button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Container fluid>
              <Row ref={screenContainer}>
                <Screen url={url} load={load} containerRef={screenContainer}/>
              </Row>
              <Row>
                <Events
                  url={url}
                  load={load}
                  events={eventStack}
                />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
