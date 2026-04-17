import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'categoria',
  title: 'Categoría',
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
      title: 'URL',
      type: 'slug',
      options: { source: 'nombre', maxLength: 96 },
      validation: Rule => Rule.required(),
      description: 'Se genera automáticamente desde el nombre.',
    }),
    defineField({
      name: 'orden',
      title: 'Orden en el menú',
      type: 'number',
      description: 'Número menor aparece primero.',
    }),
  ],
});
