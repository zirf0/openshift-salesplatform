<?php

/*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.1
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: vtiger CRM Open Source
 * All Rights Reserved.
 * Description: Defines the Russian language pack.
 * The Initial Translator is SalesPlatform Ltd.
 * SalesPlatform vtiger CRM Russian Community: http://community.salesplatform.ru/
 * If you have any questions or comments, please email: devel@salesplatform.ru
 ************************************************************************************/

$languageStrings = array(
    'Install' => 'Установка',
    'Vtiger CRM Setup' => 'Установка',
	'LBL_INSTALLATION_WIZARD' => 'Мастер установки',
	'LBL_WELCOME' => 'Добро пожаловать',
	'LBL_WELCOME_TO_VTIGER6_SETUP_WIZARD' => 'Добро пожаловать в мастер установки Sales Platform Vtiger CRM 6',
	'LBL_VTIGER6_SETUP_WIZARD_DESCRIPTION' => 'Данный мастер поможет вам установить Sales Platform Vtiger CRM 6',
	'LBL_INSTALL_BUTTON' => 'Установка',
	'LBL_DISAGREE' => 'Не согласен',
	'LBL_I_AGREE' => 'Согласен',
	'LBL_INSTALL_PREREQUISITES' => 'Предварительные требования для установки',
	'LBL_RECHECK' => 'Перепроверить',
	'LBL_PHP_CONFIGURATION' => 'Конфигурация PHP',
	'LBL_REQUIRED_VALUE' => 'Требуется',
	'LBL_PRESENT_VALUE' => 'В наличии',
	'LBL_TRUE' => 'Да',
	'LBL_PHP_RECOMMENDED_SETTINGS'=>'Рекомендованные параметры PHP',
	'LBL_READ_WRITE_ACCESS' => 'Доступ на Чтение/Запись',
	'LBL_SYSTEM_CONFIGURATION' => 'Конфигурация системы',
	'LBL_DATABASE_INFORMATION' => 'Информация БД',
	'LBL_DATABASE_TYPE' => 'Тип БД',
	'LBL_HOST_NAME' => 'Хост',
	'LBL_USERNAME' => 'Пользователь',
	'LBL_PASSWORD' => 'Пароль',
	'LBL_DB_NAME' => 'Название БД',
	'LBL_CREATE_NEW_DB'=>'Создать БД (Удалит старую, если она существует)',
	'LBL_ROOT_USERNAME' => 'Root Пользователь',
	'LBL_ROOT_PASSWORD' => 'Root Пароль',
	'LBL_SYSTEM_INFORMATION' => 'Конфигурация CRM',
	'LBL_CURRENCIES'=>'Валюта',
	'LBL_ADMIN_INFORMATION'=>'Параметры Пользователя',
	'LBL_RETYPE_PASSWORD' => 'Повторите пароль',
	'LBL_DATE_FORMAT'=>'Формат даты',
	'LBL_TIME_ZONE' => 'Часовой пояс',
	'LBL_PLEASE_WAIT'=>'Пожалуйста, подождите',
	'LBL_INSTALLATION_IN_PROGRESS'=>'Установка',
	'LBL_EMAIL' => 'E-mail',
	'LBL_ADMIN_USER_INFORMATION' => 'Параметры Пользователя',
	'LBL_CURRENCY' => 'Валюта',
	'LBL_URL' => 'URL',
	'LBL_CONFIRM_CONFIGURATION_SETTINGS' => 'Подтвердить параметры Конфигурации',
	'LBL_NEXT' => 'Далее',
        'LBL_BACK' => 'Назад',
	'LBL_PHP_VERSION' => 'Версия PHP',
	'LBL_IMAP_SUPPORT' => 'Поддержка IMAP',
	'LBL_ZLIB_SUPPORT' => 'Поддержка Zlib',
    'LBL_MYSQLI_CONNECT_SUPPORT' => 'Поддержка MySQLi',
    'LBL_OPEN_SSL' => 'Поддержка OpenSSL',
    'LBL_CURL' => 'Поддержка cURL',
	'LBL_GD_LIBRARY' => 'Графическая библиотека GD',
    'NOT RECOMMENDED' => 'Не рекомендуемые параметры',
	'ERR_DATABASE_CONNECTION_FAILED' => 'Невозможно соединится с Сервером БД',
	'ERR_INVALID_MYSQL_PARAMETERS' => 'Указаны неверные параметры соединения с сервером MySQL',
	'MSG_LIST_REASONS' => 'Причины этого могут быть следующие',
	'MSG_DB_PARAMETERS_INVALID' => 'пользователь БД, пароль, хост, тип БД или порт указаны неверно',
	'MSG_DB_USER_NOT_AUTHORIZED' => 'указанный пользователь БД не имеет прав доступа к серверу БД с данного хоста',
	'LBL_MORE_INFORMATION' => 'Дополнительная Информация',
	'ERR_INVALID_MYSQL_VERSION' => 'Версия MySQL не поддерживается, пожалуйста используйте версию MySQL 5.1.x или выше',
	'ERR_UNABLE_CREATE_DATABASE' => 'Невозможно создать БД',
	'MSG_DB_ROOT_USER_NOT_AUTHORIZED' => 'Сообщение: Указанный администратор БД не имеет прав на созание БД или название БД содержит специальные символы. Попробуйте изменить настройки БД',
	'ERR_DB_NOT_FOUND' => 'Эта БД не найдена. Попробуйте изменить настройки БД',
	'LBL_PASSWORD_MISMATCH' => 'Пожалуйста, введите пароль заново. Значения полей \"Пароль\" и \"Повторите пароль\" не совпадают.',
	'LBL_ONE_LAST_THING' => 'И еще кое-что...',
	// SalesPlatform.ru begin
	'LBL_MB_STRING' => 'Поддержка mbstring',
    'ERR_NO_UTF8_OR_NO_ALTER_RIGHTS' => 'Нет поддержки utf8 или у пользователя нет прав на изменение кодировки БД',
	// SalesPlatform.ru end
);

// SalesPlatform.ru begin SPConfiguration fix
include 'renamed/Install.php';
// SalesPlatform.ru end