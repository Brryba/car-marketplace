import type { TranslationType } from '@/types/translation-type';

const ru: TranslationType = {
  headers: {
    index: "Автомобили",
    settings: "Настройки",
    create: "Добавить",
    edit: "Изменить"
  },
  settings: {
    themeLabel: "Тема",
    languageLabel: "Язык",
    theme: {
      dark: "Тёмная",
      light: "Светлая",
      system: "Системная"
    },
    language: {
      ru: "Русский",
      en: "Английский",
      system: "Системный"
    },
    clearCache: 'Очистить кеш'
  },
  car: {
    releaseYear: "Год выпуска",
    mileage: "Пробег, км",
    price: "Цена, $",
    city: "Город",
    make: "Производитель",
    model: "Модель",
    transmission: "Коробка Передач",
    fuelType: "Тип топлива",
    engineSize: "Объем Двигателя",
    color: "Цвет",
    bodyType: "Тип Кузова",
    vin: "VIN Код",
    description: "Описание",
    photo: "Фото"
  },
  transmission: {
    Manual: 'Механика',
    Automatic: 'Автомат',
    CVT: 'Вариатор',
    Robot: 'Робот'
  },
  fuelType: {
    Gasoline: 'Бензин',
    Diesel: 'Дизель',
    Electric: 'Электро',
    Hybrid: 'Гибрид',
    LPG: 'Газ'
  },
  bodyType: {
    Sedan: 'Седан',
    SUV: 'Внедорожник',
    Hatchback: 'Хэтчбек',
    Coupe: 'Купе',
    Convertible: 'Кабриолет',
    Wagon: 'Универсал',
    Minivan: 'Минивэн',
    Pickup: 'Пикап'
  },
  color: {
    Black: 'Чёрный',
    White: 'Белый',
    Silver: 'Серебристый',
    Grey: 'Серый',
    Red: 'Красный',
    Blue: 'Синий',
    Green: 'Зелёный',
    Yellow: 'Жёлтый',
    Brown: 'Коричневый',
    Beige: 'Бежевый'
  },

  helpers: {
    kms: "км",
  },
  buttons: {
    create: 'Создать',
    save: "Сохранить",
    edit: 'Изменить',
    delete: 'Удалить',
    cancel: 'Отмена'
  },
  errors: {
    required: 'Поле обязательно',
    invalidYear: 'Неверный год',
    positive: 'Число не положительное',
    errorLabel: 'Ошибка',
    default: 'Что-то пошло не так',
    number: 'Неверный формат числа',
    loadFailed: 'Ошибка загрузки. Пожалуйста, повторите попытку позже!',
    noInternet: 'Нет подключения к интернету',
  }
};

export default ru;