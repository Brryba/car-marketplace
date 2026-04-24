import type { TranslationType } from '@/locales/translation-type';

const ru: TranslationType = {
  headers: {
    index: "Автомобили",
    settings: "Настройки",
    create: "Добавить",
    edit: "Изменить",
    auth: 'Вход в приложение'
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
    clearCache: 'Очистить кеш',
    sendNotificationIn: 'Слать ежедневные уведомления в',
    clearNotifications: 'Отменить отправку уведомлений'
  },
  filter: {
    labels: {
      make: 'Производитель',
      model: 'Модель',
      releaseYear: 'Год выпуска',
      from: 'От',
      to: 'До',
      city: 'Город',
      enterCity: 'Введите город',
      sortingLabel: 'Сортировать',
      anyMake: 'Любой',
      anyModel: 'Любая'
    },
    sorting: {
      noSorting: 'По умолчанию',
      mileageAsc: 'Пробег ↑',
      mileageDesc: 'Пробег ↓',
      releaseYearAsc: 'Год выпуска ↑',
      releaseYearDesc: 'Год выпуска ↓'
    },
    buttons: {
      clear: 'Очистить',
      submit: 'Применить'
    }
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
    logout: 'Выйти из аккаунта'
  },
  buttons: {
    create: 'Создать',
    save: "Сохранить",
    edit: 'Изменить',
    delete: 'Удалить',
    cancel: 'Отмена'
  },
  notifications: {
    title: '🚗 Car Marketplace',
    body: 'Не забудьте посмотреть новые объявления!'
  },
  login: {
    email: 'Email',
    password: 'Пароль',
    enterEmail: 'Введите email',
    enterPassword: 'Введите пароль',
    login: 'Войти',
    register: 'Зарегистрироваться'
  },
  imagePicker: {
    alert: {
      title: 'Фото',
      description: 'Выберите источник',
      camera: 'Камера',
      gallery: 'Галерея',
      cancel: 'Отмена'
    }
  },
  share: {
    divider: "━━━━━━━━━━━━━━━━━━━━",
    price: "Цена",
    photo: "Фото",
    mileage: "Пробег",
    location: "Локация",
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
    firebase: {
      invalidEmail: 'Неверный формат email',
      userNotFound: 'Пользователь не существует',
      wrongPassword: 'Неверный пароль',
      emailAlreadyInUse: 'Пользователь с таким email уже существует',
      weakPassword: 'Пароль должен быть не менее 6 символов',
      networkError: 'Ошибка выполнения запроса'
    }
  }
};

export default ru;