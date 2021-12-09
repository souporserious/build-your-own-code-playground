import * as React from 'react'
import { encode } from 'base64-url'

const initialCodeString = `
import React from 'react'

export default function App() {
  return (
    <div>
      <h1>Hello Playground</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  )
}
`.trim()

export default function Index() {
  const [code, setCode] = React.useState(initialCodeString)
  return (
    <div
      style={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: '1fr',
        minHeight: '100vh',
      }}
    >
      <textarea
        spellCheck="false"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <Preview code={code} />
    </div>
  )
}

function Preview({ code = '' }) {
  return <iframe src={`/preview?code=${encode(code)}`} />
}
