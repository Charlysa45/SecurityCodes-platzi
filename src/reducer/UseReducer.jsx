import { useEffect, useReducer } from 'react'

const SECURITY_CODE = 'paradigma'

export const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onConfirm = () => dispatch({ type: actionTypes.CONFIRM })
  const onError = () => dispatch({ type: actionTypes.ERROR })
  const onCheck = () => dispatch({ type: actionTypes.CHECK })
  const onReset = () => dispatch({ type: actionTypes.RESET })
  const onDelete = () => dispatch({ type: actionTypes.DELETE })
  const onWrite = (event) => {
    dispatch({ type: actionTypes.WRITE, payload: event.target.value })
  }
  

  useEffect(() => {
    console.log('Empezando Effect...')

    if (state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validacion')
        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
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
            onWrite(event)
          }}
        />
        <button
          onClick={onCheck}
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
          onClick={onDelete}
        >
          Dale
        </button>
        <button
          onClick={onReset}
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
          onClick={onReset}
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

const actionTypes = {
  CONFIRM: 'CONFIRM',
  ERROR: 'ERROR',
  WRITE: 'WRITE',
  CHECK: 'CHECK',
  RESET: 'RESET',
  DELETE: 'DELETE'
}

const reducerObject = (state, payload) => ({
  [actionTypes.CONFIRM]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.ERROR]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.WRITE]: {
    ...state,
    value: payload,
  },
  [actionTypes.CHECK]: {
    ...state,
    loading: true,
  },
  [actionTypes.RESET]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  },
  [actionTypes.DELETE]: {
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
