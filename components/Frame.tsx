import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type FrameProps = {
  onLoad: (element: HTMLIFrameElement) => void
  children: ReactNode
}

const fonts = `
<link href="https://fonts.gstatic.com" rel="preconnect" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400..600&family=Roboto+Mono:wght@500&display=swap"
  rel="stylesheet"
/>
`

export function Frame({ children, onLoad }: FrameProps) {
  const iframeRef = useRef(null)
  const [frame, setFrame] = useState<{
    head: HTMLHeadElement
    body: HTMLBodyElement
    container: HTMLElement
  }>({
    head: null,
    body: null,
    container: null,
  })

  function loadFrame() {
    const document = iframeRef.current.contentDocument
    const container = document.getElementById('app')
    if (container) {
      onLoad(iframeRef.current)
      setFrame({
        head: document.head,
        body: document.body,
        container,
      })
    }
  }

  useEffect(loadFrame, [])

  return (
    <>
      <iframe
        ref={iframeRef}
        onLoad={loadFrame}
        srcDoc={`<!DOCTYPE html><html><head>${fonts}</head><body><div id='app'>`}
        style={{
          width: '100%',
          minHeight: '100%',
          border: 'none',
        }}
        title="preview"
      />
      {frame.container && children && createPortal(children, frame.container)}
    </>
  )
}
