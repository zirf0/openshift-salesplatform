<?php
/*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.1
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: SalesPlatform Ltd
 * The Initial Developer of the Original Code is SalesPlatform Ltd.
 * All Rights Reserved.
 * If you have any questions or comments, please email: devel@salesplatform.ru
 ************************************************************************************/

class Vtiger_DetailDashBoard_View extends Vtiger_DashBoard_View {
    
    private $recordModel;
    
    function preProcess(Vtiger_Request $request, $display=true) {
        parent::preProcess($request, false);
        $viewer = $this->getViewer($request);
        $moduleName = $request->getModule();
        $this->recordModel = Vtiger_Record_Model::getInstanceById($request->get('record'), $moduleName);
        
        $dashBoardModel = Vtiger_DashBoard_Model::getInstance($moduleName);
        $moduleModel = Vtiger_Module_Model::getInstance('Dashboard');
        $userPrivilegesModel = Users_Privileges_Model::getCurrentUserPrivilegesModel();
        $permission = $userPrivilegesModel->hasModulePermission($moduleModel->getId());
        
        $widgets = array();
        if($permission) {
            $widgets = $dashBoardModel->getSelectableDetailDashboards($moduleName, $this->recordModel->getId());
        } 
        
        $viewer->assign('DASHBOARDHEADER_TITLE', vtranslate($moduleName, $moduleName) . ': «' . $this->recordModel->getName() . '»');
        $viewer->assign('MODULE_PERMISSION', $permission);
        $viewer->assign('WIDGETS', $widgets);
        $viewer->assign('MODULE_NAME', $moduleName);
        if($display) {
            $this->preProcessDisplay($request);
        }
    }
    
    function preProcessTplName(Vtiger_Request $request) {
        return 'dashboards/DetailDashBoardPreProcess.tpl';
    }
    
    function process(Vtiger_Request $request) {
        $viewer = $this->getViewer($request);
        $moduleName = $request->getModule();

        $dashBoardModel = Vtiger_DashBoard_Model::getInstance($moduleName);
        $moduleModel = Vtiger_Module_Model::getInstance('Dashboard');
        $userPrivilegesModel = Users_Privileges_Model::getCurrentUserPrivilegesModel();
        $permission = $userPrivilegesModel->hasModulePermission($moduleModel->getId());
        
        $widgets = array();
        if($permission) {
            $widgets = $dashBoardModel->getDetailDashboards($moduleName, $this->recordModel->getId());
        }

        $viewer->assign('MODULE_NAME', $moduleName);
        $viewer->assign('WIDGETS', $widgets);
        $viewer->assign('CURRENT_USER', Users_Record_Model::getCurrentUserModel());
        $viewer->view('dashboards/DashBoardContents.tpl', $moduleName);
    }
}
