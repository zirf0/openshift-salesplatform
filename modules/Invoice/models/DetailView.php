<?php
/*+***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *************************************************************************************/

class Invoice_DetailView_Model extends Inventory_DetailView_Model {

    // SalesPlatform.ru begin Delete duplicate Act links
    /**
     * Function to get the detail view links (links and widgets)
     * @param $linkParams
     * @internal param $ <array> $linkParams - parameters which will be used to calicaulate the params
     */
    public function getDetailViewLinks($linkParams) {
        $linkModelList = parent::getDetailViewLinks($linkParams);
        $actLinks = array();
        foreach($linkModelList['DETAILVIEW'] as $key => $value) {
            if($value->linklabel == 'LBL_INVOICE_ADD_ACT') {
                $actLinks[] = $key;
            }
        }
        if(count($actLinks) == 2) {
            unset($linkModelList['DETAILVIEW'][$actLinks[1]]);
        }
        return $linkModelList;
    }
    // SalesPlatform.ru end
}
