import { SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";
import botbiLogo from "/botbilogo.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "./InputForm";
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const { login } = useAuth();
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (action === "login") {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            username: data.user,
            password: data.password,
          }
        );
        if (response.status === 200) {
          login();
          navigate("/home");
          toast.success(response.data.message);
        }
      } else if (action === "register") {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          {
            username: data.user,
            password: data.password,
          }
        );
        toast.success(response.data.message);
      }
    } catch (error: any) {
      if (error.response.data.message) toast.error(error.response.data.message);
      else {
        console.error("Ocurrio un error inesperado: " + error);
        toast.error("Ocurrio un error inesperado");
      }
    }
  };

  return (
    <article>
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
            <Toaster position="top-right" richColors />
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
    </article>
  );
}

export default Login;
