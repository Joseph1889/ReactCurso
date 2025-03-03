interface NavItem {
    etiqueta: string;
    url: string;
    tooltip: string;
    icon?: string;
}

export const navList: NavItem[] = [
    {
        etiqueta: "Inversiones",
        url: "/inversiones",
        tooltip: "Examine nuestros proyectos"
    },
    {
        etiqueta: "Proveedores",
        url: "/proveedores",
        tooltip: "Estos son nuestros socios"
    },
    {
        etiqueta: "Empleados",
        url: "/empleados",
        tooltip: "Colaboradores de la empresa"
    },
    {
        etiqueta: "Directores",
        url: "/directores",
        tooltip: "Directores de películas"
    },
    {
        etiqueta: "Fútbol",
        url: "/futbol",
        tooltip: "Fútbol"
    },
    {
        etiqueta: "Tienda",
        url: "/tienda",
        tooltip: "Productos y servicios"
    },
]

export const navListRight: NavItem[] = [
    {
        etiqueta: "Iniciar sesión",
        url: "/login",
        tooltip: "Identifícate o regístrate en el sistema",
        icon: "bi bi-person" 
    },
    {
        etiqueta: "Carrito",
        url: "/carrito",
        tooltip: "Carrito de compras",
        icon: "bi bi-basket"
    }
]