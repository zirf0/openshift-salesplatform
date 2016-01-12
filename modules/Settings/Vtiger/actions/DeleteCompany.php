<?php
/*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.1
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: SalesPlatform Ltd
 * The Initial Developer of the Original Code is SalesPlatform Ltd.
 * All Rights Reserved.
 * If you have any questions or comments, please email: devel@salesplatform.ru
 ************************************************************************************/

/**
 * Handles new empty company creation
 *
 * @author alexd
 */
class Settings_Vtiger_DeleteCompany_Action extends Settings_Vtiger_Basic_Action {
    
    public function process(Vtiger_Request $request) {
        Settings_Vtiger_CompanyDetails_Model::deleteCompanyType(htmlspecialchars($request->get('currentCompany'), ENT_QUOTES));
        header("Location: index.php?parent=Settings&module=Vtiger&view=CompanyDetails");
    }
}
