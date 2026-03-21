import type { TranslationType } from '@/types/translation-type';

const en: TranslationType = {
  headers: {
    index: "Cars",
    settings: "Settings",
    create: "Create",
    edit: "Edit"
  },
  settings: {
    themeLabel: "Theme",
    languageLabel: "Language",
    theme: {
      dark: "Dark",
      light: "Light",
      system: "System"
    },
    language: {
      ru: "Russian",
      en: "English",
      system: "System"
    }
  },
  car: {
    releaseYear: "Release Year",
    mileage: "Mileage, km",
    price: "Price, $",
    city: "City",
    make: "Make",
    model: "Model",
    transmission: "Transmission",
    fuelType: "Fuel Type",
    engineSize: "Engine Size",
    color: "Color",
    bodyType: "Body Type",
    vin: "VIN Number",
    description: "Description",
    photo: "Photo"
  },
  transmission: {
    Manual: 'Manual',
    Automatic: 'Automatic',
    CVT: 'CVT',
    Robot: 'Robot'
  },
  fuelType: {
    Gasoline: 'Gasoline',
    Diesel: 'Diesel',
    Electric: 'Electric',
    Hybrid: 'Hybrid',
    LPG: 'LPG'
  },
  bodyType: {
    Sedan: 'Sedan',
    SUV: 'SUV',
    Hatchback: 'Hatchback',
    Coupe: 'Coupe',
    Convertible: 'Convertible',
    Wagon: 'Wagon',
    Minivan: 'Minivan',
    Pickup: 'Pickup'
  },
  color: {
    Black: 'Black',
    White: 'White',
    Silver: 'Silver',
    Grey: 'Grey',
    Red: 'Red',
    Blue: 'Blue',
    Green: 'Green',
    Yellow: 'Yellow',
    Brown: 'Brown',
    Beige: 'Beige'
  },

  helpers: {
    kms: "km"
  },
  buttons: {
    create: 'Create',
    edit: 'Edit',
    delete: 'Remove',
    save: 'Save',
    cancel: 'Cancel'
  },
  errors: {
    required: 'Field is required',
    invalidYear: 'Year is invalid',
    positive: 'Number must be positive',
    errorLabel: 'Error',
    default: 'Something went wrong',
    number: 'Invalid number format'
  }
};

export default en;