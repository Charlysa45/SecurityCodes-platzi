import { useEffect, useReducer } from 'react'

const SECURITY_CODE = 'paradigma'

export const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log('Empezando Effect...')

    if (state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validacion')
        if (state.value === SECURITY_CODE) {
          dispatch({ type: 'CONFIRM' })
        } else {
          dispatch({ type: 'ERROR' })
        }
        console.log('Terminando la validacion')
      }, 3000)
    }

    console.log('Terminando Effect...')
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
            dispatch({ type: 'WRITE', payload: event.target.value })
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: 'CHECK' })
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
            dispatch({ type: 'DELETE' })
          }}
        >
          Dale
        </button>
        <button
          onClick={() => {
            dispatch({ type: 'RESET' })
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
            dispatch({ type: 'RESET' })
          }}
        >
          Regresar
        </button>
      </>
    )
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
}

const reducerObject = (state, payload) => ({
  CONFIRM: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  WRITE: {
    ...state,
    value: payload,
  },
  CHECK: {
    ...state,
    loading: true,
  },
  RESET: {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  },
  DELETE: {
    ...state,
    deleted: true,
    value: '',
  },
})

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type]
  } else {
    return state
  }
}
