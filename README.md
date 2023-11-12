# Movies Explorer API

## Описание
REST API созданное для сервиса поиска фильмов [Movies Explorer](https://films-explorer.nomoreparties.co).  
Ссылка на frontend часть: https://github.com/JayWeee/movies-explorer-frontend

## Роуты
| Метод | Роут | Описание | Значения |
| :---: | :--: | :------: | :------: |
|  GET  | `/users/me` | Возвращает данные пользователя (email, name, _id) |
| PATCH | `/users/me` | Обновляет данные пользователя | _name, email_ |
|  GET  |  `/movies`  | Возвращает сохраненные пользователем фильмы | _country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN_ |
| POST  |  `/movies`  | Добавляет сохраненный фильм в базу данных |
| DELETE| `/movies/:_id` | Удаляет сохраненный фильм по id | _id фильма_ |
| POST  | `/signup` | Регистрирует пользователя | _name, email, password_ |
| POST  | `/signin` | Авторизирует пользователя и записывает JWT токен в cookie | _email, password_ |
|  GET  | `/signout` | Удаляет JWT токен из cookie |

## Используемые технологии:
- ExpressJs
- MongoDB
- mongooose
- jsonwebtoken
- nodemon
- celebrate
- Joi
- validator
- dotenv
- express-rate-limit
- helmet
- cors

## Чеклист
**[Критерии диплома веб-разработчика](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html)**
