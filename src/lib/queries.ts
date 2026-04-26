import { client } from './sanity';

export interface Producto {
  _id: string;
  nombre: string;
  slug: { current: string };
  categoria: { nombre: string; slug: { current: string } };
  precio: number;
  talles: string[];
  colores: string[];
  imagenes: Array<{ _key: string; asset: { _ref: string } }>;
  descripcion?: string;
  destacado?: boolean;
}

export interface Categoria {
  _id: string;
  nombre: string;
  slug: { current: string };
}

const CAMPOS = `_id, nombre, slug, "categoria": categoria->{ nombre, slug }, precio, talles, colores, imagenes, destacado`;

export async function getProductos(): Promise<Producto[]> {
  try {
    return await client.fetch(`*[_type == "producto"] | order(_createdAt desc) { ${CAMPOS} }`);
  } catch { return []; }
}

export async function getProductosDestacados(): Promise<Producto[]> {
  try {
    return await client.fetch(
      `*[_type == "producto" && destacado == true] | order(_createdAt desc)[0...8] { ${CAMPOS} }`
    );
  } catch { return []; }
}

export async function getProductoBySlug(slug: string): Promise<Producto | null> {
  try {
    return await client.fetch(
      `*[_type == "producto" && slug.current == $slug][0] { ${CAMPOS}, descripcion }`,
      { slug }
    );
  } catch { return null; }
}

export async function getProductosByCategoria(categoriaSlug: string): Promise<Producto[]> {
  try {
    return await client.fetch(
      `*[_type == "producto" && categoria->slug.current == $categoriaSlug] | order(_createdAt desc) { ${CAMPOS} }`,
      { categoriaSlug }
    );
  } catch { return []; }
}

export async function getSlugsProductos(): Promise<Array<{ slug: { current: string } }>> {
  try {
    return await client.fetch(`*[_type == "producto"] { slug }`);
  } catch { return []; }
}
