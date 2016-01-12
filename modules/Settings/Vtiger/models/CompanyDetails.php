<?php
/*+***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *************************************************************************************/

class Settings_Vtiger_CompanyDetails_Model extends Settings_Vtiger_Module_Model {

    STATIC $logoSupportedFormats = array('jpeg', 'jpg', 'png', 'gif', 'pjpeg', 'x-png');

    var $baseTable = 'vtiger_organizationdetails';
    var $baseIndex = 'organization_id';
    var $listFields = array('organizationname');
    var $nameFields = array('organizationname');
    var $logoPath = 'test/logo/';

    var $fields = array(
        'organizationname' => 'text',
        'logoname' => 'text',
        'logo' => 'file',
        'address' => 'textarea',
        'city' => 'text',
        'state' => 'text',
        'code'  => 'text',
        'country' => 'text',
        'phone' => 'text',
        'fax' => 'text',
        'website' => 'text',
        // SalesPlatform.ru begin
        //'vatid' => 'text',
        'inn' => 'text',
        'kpp' => 'text',
        'bankaccount' => 'text',
        'bankname' => 'text',
        'bankid' => 'text',
        'corraccount' => 'text',
        'director' => 'text',
        'bookkeeper' => 'text',
        'entrepreneur' => 'text',
        'entrepreneurreg' => 'text',
        'okpo' => 'text',
        'company' => 'text'
        // SalesPlatform.ru end
    );

    /**
     * Function to get Edit view Url
     * @return <String> Url
     */
    public function getEditViewUrl() {
        return 'index.php?module=Vtiger&parent=Settings&view=CompanyDetailsEdit';
    }

    /**
     * Function to get CompanyDetails Menu item
     * @return menu item Model
     */
    public function getMenuItem() {
        $menuItem = Settings_Vtiger_MenuItem_Model::getInstance('LBL_COMPANY_DETAILS');
        return $menuItem;
    }

    /**
     * Function to get Index view Url
     * @return <String> URL
     */
    public function getIndexViewUrl() {
        $menuItem = $this->getMenuItem();
        //SalesPlatform.ru begin
        return 'index.php?module=Vtiger&parent=Settings&view=CompanyDetails&block='.$menuItem->get('blockid').'&fieldid='.$menuItem->get('fieldid').'&company='. html_entity_decode($this->get('company'), ENT_QUOTES);
        //return 'index.php?module=Vtiger&parent=Settings&view=CompanyDetails&block='.$menuItem->get('blockid').'&fieldid='.$menuItem->get('fieldid');
        //SalesPlatform.ru end

    }

    /**
     * Function to get fields
     * @return <Array>
     */
    public function getFields() {
        return $this->fields;
    }

    /**
     * Function to get Logo path to display
     * @return <String> path
     */
    public function getLogoPath() {
        $logoPath = $this->logoPath;
        $handler = @opendir($logoPath);
        $logoName = $this->get('logoname');
        if ($logoName && $handler) {
            while ($file = readdir($handler)) {
                if($logoName === $file && in_array(str_replace('.', '', strtolower(substr($file, -4))), self::$logoSupportedFormats) && $file != "." && $file!= "..") {
                    closedir($handler);
                    return $logoPath.$logoName;
                }
            }
        }
        return '';
    }

    /**
     * Function to save the logoinfo
     */
    public function saveLogo() {
        $uploadDir = vglobal('root_directory'). '/' .$this->logoPath;
        $logoName = $uploadDir.$_FILES["logo"]["name"];
        move_uploaded_file($_FILES["logo"]["tmp_name"], $logoName);
        copy($logoName, $uploadDir.'application.ico');
    }

    /**
     * Function to save the Company details
     */
    public function save() {
        $db = PearDatabase::getInstance();
        $id = $this->get('id');
        $fieldsList = $this->getFields();
        unset($fieldsList['logo']);
        $tableName = $this->baseTable;

        if ($id) {
            $params = array();

            $query = "UPDATE $tableName SET ";
            foreach ($fieldsList as $fieldName => $fieldType) {
                $query .= " $fieldName = ?, ";
                array_push($params, $this->get($fieldName));
            }
            $query .= " logo = NULL WHERE organization_id = ?";

            array_push($params, $id);
        } else {
            $params = $this->getData();
            //SalesPlatform.ru begin
            unset($params['logo']);
            //SalesPlatform.ru end


            $query = "INSERT INTO $tableName (";
            foreach ($fieldsList as $fieldName => $fieldType) {
                $query .= " $fieldName,";
            }
            $query .= " organization_id) VALUES (". generateQuestionMarks($params). ", ?)";

            array_push($params, $db->getUniqueID($this->baseTable));
        }
        $db->pquery($query, $params);
    }

    /**
     * Function to get the instance of Company details module model
     * @return <Settings_Vtiger_CompanyDetais_Model> $moduleModel
     */
    //SalesPlatform.ru begin
    public static function getInstance($company = 'Default') {
        $moduleModel = new self();
        $db = PearDatabase::getInstance();

        $result = $db->pquery("SELECT DISTINCT * FROM vtiger_organizationdetails where company=?", array($company));
        if ($db->num_rows($result) == 1) {
            $moduleModel->setData($db->query_result_rowdata($result));
            $moduleModel->set('id', $moduleModel->get('organization_id'));
        }

        return $moduleModel;
    }

    /**
     * Add value to companies picklist
     */
    public static function addCompanyType($company) {
        $db = PearDatabase::getInstance();
        $res = $db->pquery('select * from vtiger_spcompany where spcompany=?', array($company));
        if($db->num_rows($res) == 0) {
            $res = $db->pquery('SELECT id+1 as id FROM vtiger_picklistvalues_seq', array());
            $picklistid = $db->query_result($res, 0, 'id');
            $db->pquery('UPDATE vtiger_picklistvalues_seq SET id=?', array($picklistid));
            $res = $db->pquery('SELECT id+1 as id FROM vtiger_spcompany_seq', array());
            $companyid = $db->query_result($res, 0, 'id');
            $db->pquery('UPDATE vtiger_spcompany_seq SET id=?', array($companyid));
            $db->pquery('INSERT INTO vtiger_spcompany(spcompanyid,spcompany,picklist_valueid) VALUES(?,?,?)',
                array($companyid, $company, $picklistid));

            return true;
        }
        return false;
    }

    /**
     * Delete info about company. It deletes only it company field from picklist table - not
     * physically from companydetails table.
     */
    public static function deleteCompanyType($company) {
        $db = PearDatabase::getInstance();
        $db->pquery('delete from vtiger_spcompany where spcompany=?', array($company));
        $db->pquery('update vtiger_invoice set spcompany = "Default" where spcompany=?', array($company));
        $db->pquery('update vtiger_quotes set spcompany = "Default" where spcompany=?', array($company));
        $db->pquery('update vtiger_salesorder set spcompany = "Default" where spcompany=?', array($company));
    }

    /**
     * Return list of all companies with it name and unique id
     */
    public static function getCompanies() {
        $db = PearDatabase::getInstance();
        $result = $db->pquery("SELECT spcompany FROM vtiger_spcompany");
        $companiesList = array();
        while($currentCompany = $db->fetch_row($result)) {
            $companiesList[] = $currentCompany['spcompany'];
        }

        return $companiesList;
    }

    // SalesPlatform.ru begin: Added separate numbering for self organizations
    /**
     * Hide or show sp company row
     * @param $moduleModel
     * @return bool
     */
    public static function hideCompanyRow($moduleModel) {
        return !in_array($moduleModel->getName(), array('Invoice', 'Act', 'Consignment'));
    }
    // SalesPlatform.ru end

//	public static function getInstance() {
//		$moduleModel = new self();
//		$db = PearDatabase::getInstance();
//
//		$result = $db->pquery("SELECT * FROM vtiger_organizationdetails", array());
//		if ($db->num_rows($result) == 1) {
//			$moduleModel->setData($db->query_result_rowdata($result));
//			$moduleModel->set('id', $moduleModel->get('organization_id'));
//		}
//
//		$moduleModel->getFields();
//		return $moduleModel;
//      }
    //SalesPlatform.ru end
}