import { Component } from "react"
import { Loading } from "../Loading"

const SECURITY_CODE = "paradigma"

export class ClassState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      error: false,
      loading: false,
    }
  }

  //   UNSAFE_componentWillMount() {
  //     console.log("componentWillMount")
  //   }

  //   componentDidMount() {
  //     console.log("componentDidMount")
  //   }

  componentDidUpdate() {
    console.log("actualizacion")

    if (this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion")

        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false, loading: false })
        } else {
          this.setState({ error: true, loading: false })
        }

        console.log("Terminando la validacion")
      }, 3000)
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el codigo de seguridad</p>
        {this.state.error && !this.state.loading && (
          <p>Error: el codigo es incorrecto</p>
        )}
        {this.state.loading && <Loading />}
        <input
          type="text"
          placeholder="codigo de seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value })
          }}
        />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    )
  }
}
