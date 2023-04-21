import { useEffect, useState } from "react"

const SECURITY_CODE = "paradigma"

export const UseState = ({ name }) => {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  })

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    })
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    })
  }

  const onWrite = (newValue) => {
    setState({ ...state, value: newValue })
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    })
  }

  const onReset = () => {
    setState({ ...state, confirmed: false, deleted: false, value: "" })
  }

  const onDelete = () => {
    setState({ ...state, deleted: true, value: "" })
  }

  useEffect(() => {
    console.log("Empezando Effect...")

    if (state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion")
        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
        }
        console.log("Terminando la validacion")
      }, 3000)
    }

    console.log("Terminando Effect...")
  }, [state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad</p>
        {state.error && !state.loading && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          type="text"
          placeholder="codigo de seguridad"
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value)
          }}
        />
        <button
          onClick={() => {
            onCheck()
          }}
        >
          Comprobar
        </button>
      </div>
    )
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Pedimos confirmación xd</p>
        <button
          onClick={() => {
            onDelete()
          }}
        >
          Dale
        </button>
        <button
          onClick={() => {
            onReset()
          }}
        >
          Nope
        </button>
      </>
    )
  } else {
    return (
      <>
        <p>Eliminado con exito</p>
        <button
          onClick={() => {
            onReset()
          }}
        >
          Regresar
        </button>
      </>
    )
  }
}
