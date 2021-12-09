import * as React from 'react'
import { useEffect, useState } from 'react'
import { decode } from 'base64-url'
import { useRouter } from 'next/router'
import { executeCode } from '../utils/execute-code'

export default function Preview() {
  const [code, setCode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)
  const router = useRouter()

  /** Decode "code" query parameter */
  useEffect(() => {
    if (router.query.code) {
      setCode(decode(router.query.code as string))
    }
  }, [router.query.code])

  /** Execute preview to render */
  useEffect(() => {
    if (code === null) return

    setError(null)
    setLoading(true)

    executeCode(code, { react: React })
      .then((Preview: React.ComponentType) => {
        setPreview(<Preview />)
      })
      .catch((error) => {
        setError(error.toString())
      })
      .finally(() => {
        setLoading(false)
      })
  }, [code])

  return (
    <>
      {loading ? 'Loading preview...' : preview}
      {error}
    </>
  )
}
