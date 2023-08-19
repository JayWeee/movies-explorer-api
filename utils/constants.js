const UPDATE_PROFILE_ERROR_MESSAGE = 'Переданы некорректные данные при обновлении профиля.';
const EMAIL_CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже существует.';
const CREATE_USER_ERROR_MESSAGE = 'Переданы некорректные данные при создании пользователя.';
const WRONG_EMAIL_PASSWORD_ERROR_MESSAGE = 'Неправильная почта или пароль';
const LOGOUT_MESSAGE = 'Вы вышли из аккаунта';

const CREATE_MOVIE_ERROR_MESSAGE = 'Переданы некорректные данные при создании фильма.';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Фильм с таким _id не найден.';
const BAD_REQUEST_MOVIE_ID_ERROR_MESSAGE = 'Передан некорректный _id фильма.';
const DELETE_MOVIE_ERROR_MESSAGE = 'Вы не можете удалять чужие фильмы.';
const DELETE_MOVIE_MESSAGE = 'Фильм удален.';

const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация.';
const NOT_FOUND_PAGE_ERROR_MESSAGE = 'Страница по указанному маршруту не найдена.';

const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';

module.exports = {
  UPDATE_PROFILE_ERROR_MESSAGE,
  EMAIL_CONFLICT_ERROR_MESSAGE,
  CREATE_USER_ERROR_MESSAGE,
  WRONG_EMAIL_PASSWORD_ERROR_MESSAGE,
  LOGOUT_MESSAGE,
  CREATE_MOVIE_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  BAD_REQUEST_MOVIE_ID_ERROR_MESSAGE,
  DELETE_MOVIE_ERROR_MESSAGE,
  DELETE_MOVIE_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  NOT_FOUND_PAGE_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
};
