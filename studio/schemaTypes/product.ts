import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL del producto',
      type: 'slug',
      options: { source: 'nombre', maxLength: 96 },
      validation: Rule => Rule.required(),
      description: 'Se genera automáticamente. Hacé clic en "Generar".',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'categoria' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'precio',
      title: 'Precio (ARS $)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: 'talles',
      title: 'Talles disponibles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'XS', value: 'XS' },
          { title: 'S', value: 'S' },
          { title: 'M', value: 'M' },
          { title: 'L', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
          { title: '34', value: '34' },
          { title: '36', value: '36' },
          { title: '38', value: '38' },
          { title: '40', value: '40' },
          { title: '42', value: '42' },
          { title: '44', value: '44' },
          { title: 'Único', value: 'Único' },
        ],
      },
    }),
    defineField({
      name: 'imagenes',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.min(1),
      description: 'La primera imagen es la principal. Podés reordenar arrastrando.',
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'destacado',
      title: 'Mostrar en la homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'nombre', precio: 'precio', media: 'imagenes.0' },
    prepare({ title, precio, media }) {
      return {
        title,
        subtitle: precio ? `$ ${Number(precio).toLocaleString('es-AR')}` : '',
        media,
      };
    },
  },
});
