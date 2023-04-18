import { Component } from "react"
import { Loading } from "../Loading"

export class ClassState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: true,
      loading: true,
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
        this.setState({ loading: false })
        console.log("Terminando la validacion")
      }, 3000)
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el codigo de seguridad</p>
        {this.state.error && <p>Error: el codigo es incorrecto</p>}
        {this.state.loading && <Loading />}
        <input type="text" placeholder="codigo de seguridad" />
        <button onClick={() => this.setState({ loading: false })}>
          Comprobar
        </button>
      </div>
    )
  }
}
