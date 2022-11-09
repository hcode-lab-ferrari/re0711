type TypeMenuData = {
  id: number;
  title: string;
  link: string;
  open: boolean;
  logged?: boolean;
};
const MenuData: Array<TypeMenuData> = [
  {
    id: 1,
    title: "Home",
    link: "/",
    open: false,
    logged: false,
  },
  {
    id: 2,
    title: "Revisão",
    link: "/#service",
    open: false,
    logged: false,
  },
  {
    id: 3,
    title: "Contato",
    link: "/#contact",
    open: false,
    logged: false,
  },
  {
    id: 4,
    title: "Agendamentos",
    link: "/schedule",
    open: false,
    logged: true,
  },
  {
    id: 5,
    title: "Editar Dados",
    link: "/profile",
    open: false,
    logged: true,
  },
  {
    id: 6,
    title: "Mudar Foto",
    link: "/change-photo",
    open: false,
    logged: true,
  },
  {
    id: 7,
    title: "Alterar Senha",
    link: "/change-password",
    open: false,
    logged: true,
  },
];
export default MenuData;
