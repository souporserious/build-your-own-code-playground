import * as React from 'react'
import { encode } from 'base64-url'

const initialCodeString = `
import React from 'react'

export default function App() {
  return (
    <div>
      <h1>Hello Playground</h1>
      <h2>
        Start editing to see some
        magic happen!
      </h2>
    </div>
  )
}
`.trim()

export default function Index() {
  const [code, setCode] = React.useState(initialCodeString)
  return (
    <div id="index">
      <textarea
        spellCheck="false"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <Preview code={code} />
    </div>
  )
}

function Preview({ code }) {
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const frameSource = React.useRef(null)

  /**
   * Only set the source of the iframe on the initial mount since we use message
   * passing below for subsequent updates.
   */
  if (frameSource.current === null) {
    frameSource.current = `/preview?code=${encode(code)}`
  }

  React.useEffect(() => {
    frameRef.current.contentWindow.postMessage({
      code: encode(code),
      type: 'preview',
    })
  }, [code])

  return <iframe ref={frameRef} src={frameSource.current} />
}
