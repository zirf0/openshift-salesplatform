<?php
/*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 ************************************************************************************/
$languageStrings = array(
	'LBL_NEW'                      => 'Добавить', 
	'LBL_WORKFLOW'                 => 'Обработчики', 
	'LBL_CREATING_WORKFLOW'        => 'Создание Обработчика', 
	'LBL_NEXT'                     => 'Далее'          , // KEY 5.x: LNK_LIST_NEXT
	'LBL_STEP_1'                   => 'Шаг 1', 
	'LBL_ENTER_BASIC_DETAILS_OF_THE_WORKFLOW' => 'Введите основные детали Обработчика',
	'LBL_SPECIFY_WHEN_TO_EXECUTE'  => 'Укажите, когда следует выполнять Обработчик',
	'ON_FIRST_SAVE'                => 'Только после первого сохранения', // KEY 5.x: LBL_ONLY_ON_FIRST_SAVE
	'ONCE'                         => 'Пока не будет достигнуто условие', // KEY 5.x: LBL_UNTIL_FIRST_TIME_CONDITION_TRUE
	'ON_EVERY_SAVE'                => 'После каждого сохранения записи', // KEY 5.x: LBL_EVERYTIME_RECORD_SAVED
	'ON_MODIFY'                    => 'После каждого изменения записи', // KEY 5.x: LBL_ON_MODIFY
    'ON_SCHEDULE'                  => 'По расписанию',
	'MANUAL'                       => 'Системный', 
	'SCHEDULE_WORKFLOW'            => 'Условие запуска', 
	'ADD_CONDITIONS'               => 'Фильтры', 
	'ADD_TASKS'                    => 'Задачи', 
	'LBL_EXPRESSION'               => 'Выражение', 
	'LBL_FIELD_NAME'               => 'Поле', 
	'LBL_SET_VALUE'                => 'Установить значение', 
	'LBL_USE_FIELD'                => 'Использовать значение поля', 
	'LBL_USE_FUNCTION'             => 'Использовать функцию', 
	'LBL_RAW_TEXT'                 => 'Простой текст',
	'LBL_ENABLE_TO_CREATE_FILTERS' => 'Включить создание фильтров',
	'LBL_CREATED_IN_OLD_LOOK_CANNOT_BE_EDITED' => 'Этот обработчик был создан в предыдущей версии. Условия, созданные в предыдущих версиях не могут быть изменены. Вы можете создать новые условия или использовать существующие условия без их изменения.', // TODO: Review
	'LBL_USE_EXISTING_CONDITIONS'  => 'Использовать существующие условия',
	'LBL_RECREATE_CONDITIONS'      => 'Создать условия',
	'LBL_SAVE_AND_CONTINUE'        => 'Сохранить и продолжить',
	'LBL_ACTIVE'                   => 'Активен', 
	'LBL_TASK_TYPE'                => 'Тип Задачи',
	'LBL_TASK_TITLE'               => 'Оглавление Задачи', 
	'LBL_ADD_TASKS_FOR_WORKFLOW'   => 'Добавить задачу для обработчика',
	'LBL_EXECUTE_TASK'             => 'Включить задержку',
	'LBL_SELECT_OPTIONS'           => 'Выберите опции', 
	'LBL_ADD_FIELD'                => 'Добавить поле', 
	'LBL_ADD_TIME'                 => 'Добавить время',
	'LBL_TITLE'                    => 'Заголовок', 
	'LBL_PRIORITY'                 => 'Приоритет', 
	'LBL_ASSIGNED_TO'              => 'Ответственный'  , 
	'LBL_TIME'                     => 'Время'                  , 
	'LBL_DUE_DATE'                 => 'Дата Платежа'     , 
	'LBL_THE_SAME_VALUE_IS_USED_FOR_START_DATE' => 'Такое же значение используется для даты начала',
	'LBL_EVENT_NAME'               => 'Имя события',
	'LBL_TYPE'                     => 'Тип', 
	'LBL_METHOD_NAME'              => 'Название метода', 
	'LBL_RECEPIENTS'               => 'Получатели',
	'LBL_ADD_FIELDS'               => 'Добавить поля',
	'LBL_SMS_TEXT'                 => 'Текст SMS',
	'LBL_SET_FIELD_VALUES'         => 'Установить значение полей', 
	'LBL_IN_ACTIVE'                => 'Неактивен', 
	'LBL_SEND_NOTIFICATION'        => 'Отправить уведомление',
	'LBL_START_TIME'               => 'Время начала'     , // KEY 5.x: Start Time
	'LBL_START_DATE'               => 'Дата начала'       , 
	'LBL_END_TIME'                 => 'Время окончания', // KEY 5.x: End Time
	'LBL_END_DATE'                 => 'Дата Окончания' , 
	'LBL_ENABLE_REPEAT'            => 'Повторить',
	'LBL_NO_METHOD_IS_AVAILABLE_FOR_THIS_MODULE' => 'Нет доступных методов для этого модуля',
	'LBL_FINISH'                   => 'Финиш', 
	'LBL_NO_TASKS_ADDED'           => 'Нет задач', 
	'LBL_CANNOT_DELETE_DEFAULT_WORKFLOW' => 'Вы не можете удалить обработчик по умолчанию',
	'LBL_MODULES_TO_CREATE_RECORD' => 'Тип сущности',
	'LBL_EXAMPLE_EXPRESSION'       => 'Выражение', 
	'LBL_EXAMPLE_RAWTEXT'          => 'Простой текст', 
	'LBL_VTIGER'                   => 'Vtiger',
	'LBL_EXAMPLE_FIELD_NAME'       => 'Поле',
	'LBL_NOTIFY_OWNER'             => 'Уведомить владельца',
	'LBL_ANNUAL_REVENUE'           => 'Годовой доход', 
	'LBL_EXPRESSION_EXAMPLE2'      => 'if mailingcountry == \'Russia\' then concat(firstname,\' \',lastname) else concat(lastname,\' \',firstname) end', // TODO: Review
    //Salesplatform.ru begin fix localization
    'Summary'                      => 'Итог',
    'Workflows'                    => 'Обработчики',
    'Module'                       => 'Модуль',
    'Execution Condition'          => 'Условие выполнения',
    'LBL_EDITING_WORKFLOW'         => 'Редактирование обработчика',
    'Send Mail'                    => 'Отправить E-mail',
    'Invoke Custom Function'       => 'Запустить пользовательскую функцию',
    'Create Todo'                  => 'Создать Задачу',
    'Update Fields'                => 'Изменить поля',
    'Create Entity'                => 'Создать сущность',
    'Create Event'                 => 'Создать Событие',
    'SMS Task'                     => 'Отправить SMS',
    'LBL_RUN_WORKFLOW'             => 'Запуск Обработчика',
    'LBL_HOURLY'                   => 'Каждый час',
    'LBL_DAILY'                    => 'Каждый день',
    'LBL_WEEKLY'                   => 'Каждую неделю',
    'LBL_SPECIFIC_DATE'            => 'Конкретная дата',
    'LBL_MONTHLY_BY_DATE'          => 'Каждый месяц',
    'LBL_YEARLY'                   => 'Каждый год',
    'LBL_ON_THESE_DAYS'            => 'Дни',
    'LBL_CHOOSE_DATE'              => 'Укажите дату',
    'LBL_SELECT_MONTH_AND_DAY'     => 'Выберите месяц и день',
    'LBL_SELECTED_DATES'           => 'Выбранные даты',
    'LBL_AT_TIME'                  => 'Время',
    'LBL_FROM'                     => 'Отправитель',
    'LBL_TO'                       => 'Получатель',
    //SalesPlatform.ru end
);
$jsLanguageStrings = array(
	'JS_STATUS_CHANGED_SUCCESSFULLY' => 'Статус успешно изменен', 
	'JS_TASK_DELETED_SUCCESSFULLY' => 'Задача удалена', 
	'JS_SAME_FIELDS_SELECTED_MORE_THAN_ONCE' => 'Некоторые поля выбраны более одного раза',
	'JS_WORKFLOW_SAVED_SUCCESSFULLY' => 'Обработчик успешно сохранен', 
);