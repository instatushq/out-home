import { useState, useEffect } from 'react'

function useOs() {
  const [os, setOs] = useState('Mac')

  useEffect(() => {
    function initOs() {
      const agent = global.navigator.userAgent
      if (agent.indexOf("Windows") != -1) setOs('Windows')
      if (agent.indexOf("Mac") != -1) setOs('Mac')
      if (agent.indexOf("Linux") != -1) setOs('Linux')
    }
    initOs()
  }, []) 

  return os
}

export default useOs

