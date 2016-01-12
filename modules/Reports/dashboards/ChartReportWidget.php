<?php
/*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.1
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: SalesPlatform Ltd
 * The Initial Developer of the Original Code is SalesPlatform Ltd.
 * All Rights Reserved.
 * If you have any questions or comments, please email: devel@salesplatform.ru
 ************************************************************************************/

class Reports_ChartReportWidget_Dashboard extends Vtiger_IndexAjax_View {
    
    public function process(Vtiger_Request $request) {
        $moduleName = $request->getModule();
        $widgetView = new Reports_ChartDetail_View();
        $currentUser = Users_Record_Model::getCurrentUserModel();
        $widget = Vtiger_Widget_Model::getInstance($request->get('linkid'), $currentUser->getId());
        $widget->applyTemplateRecordId($request->get('report_record_id'));
         
        $viewer = new Vtiger_Viewer();
        $viewer->assign('WIDGET', $widget);
        $viewer->assign('MODULE_NAME', $moduleName);
        
        $content = $request->get('content');
        $reportDisplay = $widgetView->getReport($request, true);
        if(!empty($content)) {
            echo $reportDisplay;
        } else {
            $viewer->assign('CHART_REPORT_WIDGET_CONTENTS', $reportDisplay);
            $viewer->view('dashboards/ChartReportWidget.tpl', $moduleName);
        }
    }
}
