import {defineType, defineField} from 'sanity'

export const listingType = defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Venta', value: 'venta'},
          {title: 'Alquiler', value: 'alquiler'},
        ],
      },
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'property',
      title: 'Propiedad',
      type: 'reference',
      to: [{type: 'property'}],
    }),
    defineField({
      name: 'agent',
      title: 'Agente',
      type: 'reference',
      to: [{type: 'agent'}],
    }),
    defineField({
      name: 'featured',
      title: 'Destacada',
      type: 'boolean',
    }),
    defineField({
      name: 'currency',
      title: 'Moneda',
      type: 'string',
      options: {
        list: [
          {title: 'USD', value: 'usd'},
          {title: 'ARS', value: 'ars'},
        ],
      },
      validation: (rule) =>
        rule.custom((value) => {
          if (value && ['usd', 'ars'].includes(value)) {
            return true
          }
          return 'Type debe ser USD o ARS'
        }),
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Estado',
      initialValue: 'disponible',
      options: {
        list: [
          {title: 'Disponible', value: 'disponible'},
          {title: 'Vendido', value: 'vendida'},
          {title: 'Reservado', value: 'reservada'},
          {title: 'No disponible', value: 'no_disponible'},
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (rule) =>
        rule.custom((value) => (!value || value > 1000 ? true : 'El precio debe ser mayor a 1000')),
    }),
  ],
})
