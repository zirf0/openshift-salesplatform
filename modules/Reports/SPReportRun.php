<?php
/*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.1
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: SalesPlatform Ltd
 * The Initial Developer of the Original Code is SalesPlatform Ltd.
 * All Rights Reserved.
 * If you have any questions or comments, please email: devel@salesplatform.ru
 ************************************************************************************/
/* This file was migrated from sp_vtiger_540_201310 */
require_once("modules/Reports/ReportRun.php");

/**
 * @return array
 * @throws Exception
 */
function getCustomReportsList() {
    global $adb;
    $reportList = array();

    $res = $adb->query('SELECT reporttype FROM sp_custom_reports');
    for($i = 0; $i < $adb->num_rows($res); $i++) {
        $reportList[] = $adb->query_result($res, $i, 'reporttype');
    }

    return $reportList;
}

/**
 * @return array
 * @throws Exception
 */
function getCustomReportsListWithDateFilter() {
    global $adb;
    $reportList = array();

    $res = $adb->query('SELECT reporttype FROM sp_custom_reports WHERE datefilter=1');
    for($i = 0; $i < $adb->num_rows($res); $i++) {
        $reportList[] = $adb->query_result($res, $i, 'reporttype');
    }

    return $reportList;
}

/**
 * @return array
 * @throws Exception
 */
function getCustomReportsListWithOwnerFilter() {
    global $adb;
    $reportList = array();

    $res = $adb->query('SELECT reporttype FROM sp_custom_reports WHERE ownerfilter=1');
    for($i = 0; $i < $adb->num_rows($res); $i++) {
        $reportList[] = $adb->query_result($res, $i, 'reporttype');
    }

    return $reportList;
}

/**
 * @return array
 * @throws Exception
 */
function getCustomReportsListWithAccountFilter() {
    global $adb;
    $reportList = array();

    $res = $adb->query('SELECT reporttype FROM sp_custom_reports WHERE accountfilter=1');
    for($i = 0; $i < $adb->num_rows($res); $i++) {
        $reportList[] = $adb->query_result($res, $i, 'reporttype');
    }

    return $reportList;
}

?>
