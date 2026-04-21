import type { TranslationType } from '@/locales/translation-type';

const en: TranslationType = {
  headers: {
    index: "Cars",
    settings: "Settings",
    create: "Create",
    edit: "Edit",
    auth: "Login into application"
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
    },
    clearCache: 'Clear cache',
    sendNotificationIn: 'Send daily notification in',
    clearNotifications: 'Cancel all notifications',
  },
  filter: {
    labels: {
      make: 'Make',
      model: 'Model',
      releaseYear: 'Release Year',
      from: 'From',
      to: 'To',
      city: 'City',
      enterCity: 'Enter city name...',
      sortingLabel: 'Sort by',
      anyMake: 'Any',
      anyModel: 'Any'
    },
    sorting: {
      noSorting: 'Default',
      mileageAsc: 'Mileage ↑',
      mileageDesc: 'Mileage ↓',
      releaseYearAsc: 'Release Year ↑',
      releaseYearDesc: 'Release Year ↓'
    },
    buttons: {
      clear: 'Clear',
      submit: 'Apply'
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
  notifications: {
    title: '🚗 Car Marketplace',
    body: 'Don`t forget to check out our last listings!'
  },
  errors: {
    required: 'Field is required',
    invalidYear: 'Year is invalid',
    positive: 'Number must be positive',
    errorLabel: 'Error',
    default: 'Something went wrong',
    number: 'Invalid number format',
    loadFailed: 'Loading error. Please try again later',
    noInternet: 'No internet connection',
  }
};

export default en;