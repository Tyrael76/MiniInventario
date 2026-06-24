export interface Categoria {
    idCategoria?: number;
    nombreCategoria: string;
    descripcionCategoria: string;
    createAt?: string; // LocalDate is mapped as string (ISO-8601) in JSON
}
