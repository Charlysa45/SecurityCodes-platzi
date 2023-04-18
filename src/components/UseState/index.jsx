import { useEffect, useState } from "react"

const SECURITY_CODE = "paradigma"

export const UseState = ({ name }) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("Empezando Effect...")

    if (loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion")
        if (value === SECURITY_CODE) {
          //   setError(true)
        }
        setLoading(false)
        console.log("Terminando la validacion")
      }, 3000)
    }

    console.log("Terminando Effect...")
  }, [loading])

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el codigo de seguridad</p>
      {error && !loading && <p>Error: el codigo es incorrecto</p>}
      {loading && <p>Cargando...</p>}
      <input
        type="text"
        placeholder="codigo de seguridad"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
      />
      <button
        onClick={() => {
          setLoading(true)
          //   setError(false)
        }}
      >
        Comprobar
      </button>
    </div>
  )
}
