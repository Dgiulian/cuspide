import {defineField, defineType} from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Casa', value: 'casa'},
          {title: 'Departamento', value: 'departamento'},
          {title: 'Duplex', value: 'duplex'},
          {title: 'Terreno', value: 'terreno'},
          {title: 'Local', value: 'local'},
        ],
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          if (value && ['casa', 'departamento', 'terreno', 'local'].includes(value)) {
            return true
          }
          return 'Type debe ser casa, departamento, local o terreno'
        }),
    }),
    defineField({
      name: 'lot_size',
      title: 'Sup. Terreno',
      type: 'number',
    }),
    defineField({
      name: 'surface',
      title: 'Sup. Cubierta',
      type: 'number',
      hidden: ({parent}) => ['terreno'].includes(parent?.type),
    }),
    defineField({
      name: 'rooms',
      title: 'habitaciones',
      type: 'number',
      hidden: ({parent}) => ['terreno'].includes(parent?.type),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Baños',
      type: 'number',
      hidden: ({parent}) => ['terreno'].includes(parent?.type),
    }),
    defineField({
      name: 'year_built',
      title: 'Año',
      type: 'number',
      hidden: ({parent}) => ['terreno'].includes(parent?.type),
    }),
    defineField({
      name: 'garage',
      title: 'Garage',
      type: 'boolean',
      hidden: ({parent}) => !['casa', 'duplex'].includes(parent?.type),
    }),
    defineField({
      name: 'balcony',
      title: 'Balcon',
      type: 'boolean',
      hidden: ({parent}) => !['casa', 'departamento', 'duplex'].includes(parent?.type),
    }),
    defineField({
      name: 'province',
      title: 'Provincia',
      type: 'string',
      initialValue: 'Neuquén',
    }),
    defineField({
      name: 'city',
      title: 'Ciudad',
      type: 'string',
    }),
    defineField({
      name: 'orientation',
      title: 'Orientacion',
      type: 'string',
      hidden: ({parent}) => !['terreno'].includes(parent?.type),
      options: {
        list: [
          {title: 'Norte', value: 'norte'},
          {title: 'Sur', value: 'sur'},
          {title: 'Este', value: 'este'},
          {title: 'Oeste', value: 'oeste'},
          {title: 'Noreste', value: 'noreste'},
          {title: 'Noroeste', value: 'noroeste'},
          {title: 'Sureste', value: 'sureste'},
          {title: 'Suroeste', value: 'suroeste'},
        ],
      },
    }),
    defineField({
      name: 'amenities',
      type: 'array',
      title: 'Amenities',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Piscina', value: 'piscina'},
          {title: 'Gym', value: 'gym'},
          {title: 'Balcon', value: 'balcon'},
          {title: 'Estacionamiento', value: 'estacionamiento'},
          {title: 'Acensor', value: 'ascensor'},
          {title: 'Garden', value: 'jardin'},
          {title: 'SUM', value: 'sum'},
        ],
        layout: 'tags', // Allows multiple selections in a tag-like format
      },
      hidden: ({parent}) => !['departamento'].includes(parent?.type),
    }),
    defineField({
      name: 'utilities',
      type: 'array',
      title: 'Servicios',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Luz', value: 'luz'},
          {title: 'Agua', value: 'agua'},
          {title: 'Gas', value: 'gas'},
          {title: 'Cordon Cuneta', value: 'cordon'},
          {title: 'Internet', value: 'internet'},
        ],
        layout: 'list', // Allows multiple selections in a tag-like format
      },
      hidden: ({parent}) => !['terreno'].includes(parent?.type),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image_cover',
      type: 'image',
    }),
    defineField({
      name: 'location',
      title: 'Ubicacion',
      type: 'geopoint',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})
