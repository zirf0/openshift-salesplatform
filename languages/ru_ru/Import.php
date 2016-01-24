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
	'LBL_IMPORT_STEP_1'            => 'Шаг 1'                      , // TODO: Review
	'LBL_IMPORT_STEP_1_DESCRIPTION' => 'Выберите файл'                 , // TODO: Review
	'LBL_IMPORT_SUPPORTED_FILE_TYPES' => 'Поддерживаемые типы файлов: .CSV, .VCF', // TODO: Review
	'LBL_IMPORT_STEP_2'            => 'Шаг 2'                      , // TODO: Review
	'LBL_IMPORT_STEP_2_DESCRIPTION' => 'Установить формат'              , // TODO: Review
	'LBL_FILE_TYPE'                => 'Тип файла'                   , // TODO: Review
	'LBL_CHARACTER_ENCODING'       => 'Кодировка'          , // TODO: Review
	'LBL_DELIMITER'                => 'Разделитель:'     , 
	'LBL_HAS_HEADER'               => 'Заголовок:'         , 
	'LBL_IMPORT_STEP_3'            => 'Шаг 3'                      , // TODO: Review
	'LBL_IMPORT_STEP_3_DESCRIPTION' => 'Обработка дублирующихся записей'   , // TODO: Review
	'LBL_IMPORT_STEP_3_DESCRIPTION_DETAILED' => 'Выберите эту опцию для включения и задания критериев слияния дубликатов', // TODO: Review
	'LBL_SPECIFY_MERGE_TYPE'       => 'Выберите, как дублирующиеся записи должны быть обработаны', 
	'LBL_SELECT_MERGE_FIELDS'      => 'Выберите соответствующие поля для поиска дублирующихся записей',
	'LBL_AVAILABLE_FIELDS'         => 'Доступные поля' , 
	'LBL_SELECTED_FIELDS'          => 'Соответствующие поля', 
	'LBL_NEXT_BUTTON_LABEL'        => 'Далее'                  , 
	'LBL_IMPORT_STEP_4'            => 'Шаг 4',
	'LBL_IMPORT_STEP_4_DESCRIPTION' => 'Соответствие колонок полям модуля',
	'LBL_FILE_COLUMN_HEADER'       => 'Заголовок',
	'LBL_ROW_1'                    => 'Строка 1',
	'LBL_CRM_FIELDS'               => 'Поля CRM',
	'LBL_DEFAULT_VALUE'            => 'Значение по умолчанию',
	'LBL_SAVE_AS_CUSTOM_MAPPING'   => 'Сохранить как Пользовательское Соответствие',
	'LBL_IMPORT_BUTTON_LABEL'      => 'Импорт'                , // KEY 5.x: LBL_IMPORT
	'LBL_RESULT'                   => 'Результат',
	'LBL_TOTAL_RECORDS_IMPORTED'   => 'Всего импортировано записей', 
	'LBL_NUMBER_OF_RECORDS_CREATED' => 'Всего записей создано',
	'LBL_NUMBER_OF_RECORDS_UPDATED' => 'Всего записей перезаписано',
	'LBL_NUMBER_OF_RECORDS_SKIPPED' => 'Всего записей пропущено',
	'LBL_NUMBER_OF_RECORDS_MERGED' => 'Всего объединено записей',
	'LBL_TOTAL_RECORDS_FAILED'     => 'Всего не удалось импортировать записей',
	'LBL_IMPORT_MORE'              => 'Импортировать еще', 
	'LBL_VIEW_LAST_IMPORTED_RECORDS' => 'Последние импортированные записи',
	'LBL_UNDO_LAST_IMPORT'         => 'Отменить последний импорт', 
	'LBL_FINISH_BUTTON_LABEL'      => 'Финиш'                  , // KEY 5.x: LBL_FINISH
	'LBL_UNDO_RESULT'              => 'Отменить результат импорта',
	'LBL_TOTAL_RECORDS'            => 'Всего записей',
	'LBL_NUMBER_OF_RECORDS_DELETED' => 'Всего удалено записей',
	'LBL_OK_BUTTON_LABEL'          => 'ОК',
	'LBL_IMPORT_SCHEDULED'         => 'Импорт запланирован',
	'LBL_RUNNING'                  => 'Запущен',
	'LBL_CANCEL_IMPORT'            => 'Отменить импорт',
	'LBL_ERROR'                    => 'Ошибка', 
	'LBL_CLEAR_DATA'               => 'Очистить данные',
	'ERR_UNIMPORTED_RECORDS_EXIST' => 'Есть еще некоторые неимпортированные записи в очереди, которые блокируют дальнейший импорт данных. <br>
										Очистите их, чтобы начать импорт снова',
	'ERR_IMPORT_INTERRUPTED'       => 'Текущий импорт был прерван. Пожалуйста, повторите попытку позже.',
	'ERR_FAILED_TO_LOCK_MODULE'    => 'Не удалось заблокировать модуль для импорта. Пожалуйста, повторите попытку позже',
	'LBL_SELECT_SAVED_MAPPING'     => 'Использовать сохраненное Соответствие',
	'LBL_IMPORT_ERROR_LARGE_FILE'  => 'Слишком большой файл',
	'LBL_FILE_UPLOAD_FAILED'       => 'Неудачная загрузка файла',
	'LBL_IMPORT_CHANGE_UPLOAD_SIZE' => 'Измените размер загружаемого файла',
	'LBL_IMPORT_DIRECTORY_NOT_WRITABLE' => 'Директория не для записи',
	'LBL_IMPORT_FILE_COPY_FAILED'  => 'Неудачное копирование файла импорта',
	'LBL_INVALID_FILE'             => 'Неверный файл',
	'LBL_NO_ROWS_FOUND'            => 'Строки не найдены',
	'LBL_SCHEDULED_IMPORT_DETAILS' => 'Ваш импорт был запланирован, после того, как импорт будет завершен, вы получите уведомление по электронной почте. <br>
										Пожалуйста, убедитесь, что сервер исходящей почты и адрес электронной почты настроены на получение уведомлений',
	'LBL_DETAILS'                  => 'Детали',
	'skipped'                      => 'Пропущено записей',
	'failed'                       => 'Ошибочные записи',
    
    // SalesPlatform.ru begin localization for Import
    'csv' => 'CSV',
	'vcf' => 'VCard',
    'UTF-8' => 'UTF-8',
	'ISO-8859-1' => 'ISO-8859-1',
	'comma' => ', (запятая)',
	'semicolon' => '; (точка с запятой)',
    
    'Skip' => 'Пропустить',
	'Overwrite' => 'Перезаписать',
	'Merge' => 'Совместить',
    // SalesPlatform.ru end
);

// SalesPlatform.ru begin SPConfiguration fix
include 'renamed/Import.php';
// SalesPlatform.ru end