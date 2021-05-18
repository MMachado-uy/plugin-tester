import { useEffect, useState } from 'react';
import './Screen.scss';

function Screen(props) {
  const { url, load, containerRef } = props;
  const [ scale, setScale ] = useState(null);

  useEffect(() => {
    if (!!containerRef) {
      setScale(containerRef.current.clientWidth / 1920);
    }
  }, [containerRef])

  useEffect(() => {
    if (!!containerRef && !!scale) {
      containerRef.current.style.height = `${1080 * scale}px`;
    }
  }, [containerRef, scale])

  return (
    <div className='Screen'>
      <div className={'actual-screen'} style={{transform: `scale(${scale})`}}>
        {url && load &&
          <iframe frameBorder="0" width="100%" height="100%" title='Screen' id='iframe' src={url} />
        }
      </div>
    </div>
  );
}

export default Screen;
