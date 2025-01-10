import { SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";
import botbiLogo from "/botbilogo.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "./InputForm";
import { useState } from "react";

const schema = z.object({
  user: z
    .string()
    .nonempty("El usuario es obligatorio")
    .max(40, "El usuario solo puede tener maximo 40 caracteres"),
  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(15, "La contraseña solo puede tener maximo 15 caracteres"),
});

type FormValues = z.infer<typeof schema>;

function Login() {
  const [action, setAction] = useState<"login" | "register">("login");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (action === "login") {
      console.log("Haciendo login con los datos:", data);
    } else if (action === "register") {
      console.log("Haciendo registro con los datos:", data);
    }
  };

  return (
    <section className="login">
      <img src={botbiLogo} alt="Logo" />
      {/* <h1>Inicia sesion aqui</h1> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-inputs">
          <InputForm
            name="user"
            control={control}
            label="Usuario"
            type="text"
            error={errors.user}
          />
          <InputForm
            name="password"
            control={control}
            label="Contraseña"
            type="password"
            error={errors.password}
          />
        </div>
        <div className="login-ButtonsContainer">
          <button
            type="submit"
            className="login-button"
            onClick={() => setAction("login")}
          >
            Iniciar Sesion
          </button>
          <button
            type="submit"
            className="login-button"
            onClick={() => setAction("register")}
          >
            Registrarse
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
