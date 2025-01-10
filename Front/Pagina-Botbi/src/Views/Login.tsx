import "./Login.css";
import botbiLogo from "/botbilogo.svg";

function Login() {
  return (
    <section className="login">
      <img src={botbiLogo} alt="Logo" />
      <h1>Inicia sesion aqui</h1>
      <form>
        <div className="login-inputs">
          <input placeholder="Usuario" type="text" />
          <input placeholder="Contraseña" type="password" />
        </div>
        <button type="submit" className="login-button">
          Iniciar Sesion
        </button>
      </form>
      <p className="login-NoAccount">
        ¿No cuentas con una cuenta? <a>Registrate aqui</a>
      </p>
    </section>
  );
}

export default Login;
