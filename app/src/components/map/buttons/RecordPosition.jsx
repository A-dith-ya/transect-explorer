import { useContext } from 'react'
import running from '../../../images/icons/running.png'
import { RECORD_POSITION_START, RECORD_POSITION_STOP } from '../../../state/actions'
import { MapContext } from '../../../contexts/MapContext'

export default function RecordPosition() {
  const { state, dispatch } = useContext(MapContext)

  const handleClick = () => {
    if (state.record_position) dispatch({ type: RECORD_POSITION_STOP })
    else dispatch({ type: RECORD_POSITION_START })
  }

  return (
    <button id='footer-button' onClick={handleClick}>
      <img src={running} style={{ height: 32, width: 32 }} />
    </button>
  )
}
{/* <a href='https://www.flaticon.com/free-icons/jogging' title='jogging icons'>Jogging icons created by Vector Stall - Flaticon</a> */ }