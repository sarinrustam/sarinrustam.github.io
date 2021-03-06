# Тестовое задание для компании ASPIRITY

## Задание:

Требуется реализовать приложение для спортсменов “BestRunner”, чтобы учитывать спортивные активности. В качестве результата работы необходимо предоставить:
1. Ссылка на git репозиторий с исходным кодом и инструкцией, как запустить приложение локально.
2. (Не обязательно, но будет плюсом) Ссылка на опубликованное приложение.

### Описание функционала:
В приложении можно:
1. Посмотреть таблицу прошедших тренировок (дата, тип тренировки, километраж):
  * Фильтрация по типу активности и сортировка по дате и километражу
  * Возможность удалить тренировку
  * (Не обязательно, но будет плюсом) Вывести график – километраж по неделям
2. Добавить или отредактировать прошедшую тренировку: 
  * Сколько км пробежал
  * Дата тренировки
  * Тип тренировки (бег, велосипед, лыжи, ходьба)
  * Комментарий (текстовое поле)

### Технические детали: 
Минимальные версии:
* React 16.8 (hooks), Обязательное использование  redux 4.0.
* css in js (styled, emotion), webpack 4, es6 или выше.
* Формы: formik, react-hook-form.
* UI компоненты https://reactstrap.github.io или подобные.

Для получения / обновления данных приложение должно взаимодействовать с сервером на основе NodeJs + Express последней версии через REST API. Для простоты не предполагается работы с базой данных, то есть данные можно хранить в оперативной памяти сервера. Если использование server части невозможно, то можно использовать localeStorage, но сервер будет огромным плюсом.
**В качестве основы кода проекта можно использовать [Aspirity Web Template](http://get-awt.int.aspirity.com/4086af31-0db6-40d2-8cf3-0b10739c0844)**

# Опубликованная версия

**Ссылка на опубликованную версию** - [https://sarinrustam.github.io](https://sarinrustam.github.io)

# Как запустить локально

1. Скачайте архив приложения
2. Установите зависимости командой ``npm install``
3. Запустите сборку локально командой ``npm run start``
4. По умолчанию сборка запустится по адресу http://localhost:3000/

# Контакты
1. WhatsApp, Telegram: 8-919-773-43-11
2. Email: lorienas@gmail.com
