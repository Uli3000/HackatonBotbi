import { useModalContext } from "../Context/ModalContext";
import Modal from "./Modal";
import "./Clientes.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "./InputForm";
import axios from "axios";
import { toast, Toaster } from "sonner";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z
    .string()
    .nonempty("El nombre es obligatorio")
    .max(50, "Máximo 50 caracteres"),
  apellido_paterno: z
    .string()
    .nonempty("El apellido paterno es obligatorio")
    .max(50, "Máximo 50 caracteres"),
  apellido_materno: z
    .string()
    .nonempty("El apellido materno es obligatorio")
    .max(50, "Máximo 50 caracteres"),
  email: z
    .string()
    .email("Debe ser un correo válido")
    .nonempty("El correo es obligatorio"),
  telefono: z
    .string()
    .regex(/^\d+$/, "Debe ser un número válido")
    .nonempty("El teléfono es obligatorio"),
  calle: z.string().nonempty("La calle es obligatoria"),
  numero: z
    .string()
    .regex(/^\d+$/, "Debe ser un número válido")
    .nonempty("El número es obligatorio"),
  ciudad: z.string().nonempty("La ciudad es obligatoria"),
  estado: z.string().nonempty("El estado es obligatorio"),
  pais: z.string().nonempty("El país es obligatorio"),
  codigo_postal: z
    .string()
    .regex(/^\d{5}$/, "Debe ser un código postal válido")
    .nonempty("El código postal es obligatorio"),
});

type FormValues = z.infer<typeof schema>;

function Clientes() {
  const { setState } = useModalContext();

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { name: "Nombre", selector: (row: any) => row.nombre, sortable: true },
    { name: "Apellido Paterno", selector: (row: any) => row.apellido_paterno },
    { name: "Apellido Materno", selector: (row: any) => row.apellido_materno },
    { name: "Correo Electrónico", selector: (row: any) => row.email },
    { name: "Teléfono", selector: (row: any) => row.telefono },
    { name: "Calle", selector: (row: any) => row.calle },
    { name: "Número", selector: (row: any) => row.numero },
    { name: "Ciudad", selector: (row: any) => row.ciudad },
    { name: "Estado", selector: (row: any) => row.estado },
    { name: "País", selector: (row: any) => row.pais },
    { name: "Código Postal", selector: (row: any) => row.codigo_postal },
    { name: "Latitud", selector: (row: any) => row.latitud },
    { name: "Longitud", selector: (row: any) => row.longitud },
    {
      name: "",
      cell: (row: any) => (
        <button onClick={() => handleDelete(row.id)} className="delete-button">
          Eliminar
        </button>
      ),
    },
  ];

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      toast.error("Error al obtener los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      apellido_paterno: "",
      apellido_materno: "",
      email: "",
      telefono: "",
      calle: "",
      numero: "",
      ciudad: "",
      estado: "",
      pais: "",
      codigo_postal: "",
    },
  });

  const openModal = () => {
    setState(true);
  };

  const closeModal = () => {
    setState(false);
    reset();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/clientes", {
        nombre: data.name,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        email: data.email,
        telefono: data.telefono,
        calle: data.calle,
        numero: data.numero,
        ciudad: data.ciudad,
        estado: data.estado,
        pais: data.pais,
        codigo_postal: data.codigo_postal,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        fetchClientes();
      }
    } catch (error: any) {
      if (error.response.data.message) toast.error(error.response.data.message);
      else {
        console.error("Ocurrio un error inesperado: " + error);
        toast.error("Ocurrio un error inesperado");
      }
    }
    closeModal();
  };

  const handleDelete = async (clientId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/clientes/${clientId}`);
      setClientes(clientes.filter((client: any) => client.id !== clientId));
      toast.info("Cliente eliminado");
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      toast.error("Error al eliminar el cliente");
    }
  };

  return (
    <div className="clientes-container">
      <Toaster position="top-right" richColors />
      <header className="clientes-header">
        <h1>Clientes</h1>
        <button className="create-button" onClick={openModal}>
          Crear Cliente
        </button>
      </header>

      <Modal>
        <>
          <h1 className="modal-title">Agregar Cliente</h1>
          <form className="client-form" onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              name="name"
              control={control}
              label="Nombre:"
              type="text"
              error={errors.name}
            />
            <InputForm
              name="apellido_paterno"
              control={control}
              label="Apellido Paterno:"
              type="text"
              error={errors.apellido_paterno}
            />
            <InputForm
              name="apellido_materno"
              control={control}
              label="Apellido Materno:"
              type="text"
              error={errors.apellido_materno}
            />
            <InputForm
              name="email"
              control={control}
              label="Correo Electrónico:"
              type="email"
              error={errors.email}
            />
            <InputForm
              name="telefono"
              control={control}
              label="Teléfono:"
              type="text"
              error={errors.telefono}
            />
            <InputForm
              name="calle"
              control={control}
              label="Calle:"
              type="text"
              error={errors.calle}
            />
            <InputForm
              name="numero"
              control={control}
              label="Número:"
              type="text"
              error={errors.numero}
            />
            <InputForm
              name="ciudad"
              control={control}
              label="Ciudad:"
              type="text"
              error={errors.ciudad}
            />
            <InputForm
              name="estado"
              control={control}
              label="Estado:"
              type="text"
              error={errors.estado}
            />
            <InputForm
              name="pais"
              control={control}
              label="País:"
              type="text"
              error={errors.pais}
            />
            <InputForm
              name="codigo_postal"
              control={control}
              label="Código Postal:"
              type="text"
              error={errors.codigo_postal}
            />
            <div className="form-buttons">
              <button type="submit" className="modal-button">
                Agregar
              </button>
            </div>
          </form>
        </>
      </Modal>

      <div className="table-placeholder">
        <DataTable
          columns={columns}
          data={clientes}
          progressPending={loading}
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default Clientes;
