<?php
/*+***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *************************************************************************************/

class Inventory_Detail_View extends Vtiger_Detail_View {
	function preProcess(Vtiger_Request $request) {
		$viewer = $this->getViewer($request);
		$viewer->assign('NO_SUMMARY', true);
		parent::preProcess($request);
	}

	/**
	 * Function returns Inventory details
	 * @param Vtiger_Request $request
	 */
	function showModuleDetailView(Vtiger_Request $request) {
		echo parent::showModuleDetailView($request);
		$this->showLineItemDetails($request);
	}

	/**
	 * Function returns Inventory details
	 * @param Vtiger_Request $request
	 * @return type
	 */
	function showDetailViewByMode(Vtiger_Request $request) {
		return $this->showModuleDetailView($request);
	}

	function showModuleBasicView($request) {
		return $this->showModuleDetailView($request);
	}
	/**
	 * Function returns Inventory Line Items
	 * @param Vtiger_Request $request
	 */
	function showLineItemDetails(Vtiger_Request $request) {
		$record = $request->get('record');
		$moduleName = $request->getModule();

		$recordModel = Inventory_Record_Model::getInstanceById($record);
		$relatedProducts = $recordModel->getProducts();

		//##Final details convertion started
		$finalDetails = $relatedProducts[1]['final_details'];

		//Final tax details convertion started
		$taxtype = $finalDetails['taxtype'];
		//SalesPlatform.ru begin 
                if ($taxtype == 'group' || $taxtype == 'group_tax_inc') { 
                //if ($taxtype == 'group') { 
                //SalesPlatform.ru end 
			$taxDetails = $finalDetails['taxes'];
			$taxCount = count($taxDetails);
			for($i=0; $i<$taxCount; $i++) {
                            //SalesPlatform.ru begin
                            if($taxtype == 'group_tax_inc' ) { 
                                $taxDetails[$i]['taxlabel'] = vtranslate('LBL_INC_TAX') . ' ' . $taxDetails[$i]['taxlabel']; 
                            } 
                            
                            $taxDetails[$i]['amount'] = htmlentities(Vtiger_Currency_UIType::transformDisplayValue($taxDetails[$i]['amount'], null, true), ENT_QUOTES | ENT_HTML401);
				//$taxDetails[$i]['amount'] = Vtiger_Currency_UIType::transformDisplayValue($taxDetails[$i]['amount'], null, true);
                            //SalesPlatform.ru end
			}
			$finalDetails['taxes'] = $taxDetails;
		}
		//Final tax details convertion ended

		//Final shipping tax details convertion started
		$shippingTaxDetails = $finalDetails['sh_taxes'];
		$taxCount = count($shippingTaxDetails);
		for($i=0; $i<$taxCount; $i++) {
                    //SalesPlatform.ru begin
                    if($taxtype == 'group_tax_inc' ) { 
                        $shippingTaxDetails[$i]['taxlabel'] = vtranslate('LBL_INC_TAX') . ' ' . $shippingTaxDetails[$i]['taxlabel']; 
                    } 
        
                    $shippingTaxDetails[$i]['amount'] = htmlentities(Vtiger_Currency_UIType::transformDisplayValue($shippingTaxDetails[$i]['amount'], null, true), ENT_QUOTES | ENT_HTML401);
			//$shippingTaxDetails[$i]['amount'] = Vtiger_Currency_UIType::transformDisplayValue($shippingTaxDetails[$i]['amount'], null, true);
                    //SalesPlatform.ru end
		}
		$finalDetails['sh_taxes'] = $shippingTaxDetails;
		//Final shipping tax details convertion ended

		$currencyFieldsList = array('adjustment', 'grandTotal', 'hdnSubTotal', 'preTaxTotal', 'tax_totalamount',
									'shtax_totalamount', 'discountTotal_final', 'discount_amount_final', 'shipping_handling_charge', 'totalAfterDiscount');
		foreach ($currencyFieldsList as $fieldName) {
                    //SalesPlatform.ru begin
                    $finalDetails[$fieldName] = htmlentities(Vtiger_Currency_UIType::transformDisplayValue($finalDetails[$fieldName], null, true), ENT_QUOTES | ENT_HTML401);
			//$finalDetails[$fieldName] = Vtiger_Currency_UIType::transformDisplayValue($finalDetails[$fieldName], null, true);
                    //SalesPlatform.ru end
		}

		$relatedProducts[1]['final_details'] = $finalDetails;
		//##Final details convertion ended

		//##Product details convertion started
		$productsCount = count($relatedProducts);
		for ($i=1; $i<=$productsCount; $i++) {
			$product = $relatedProducts[$i];

			//Product tax details convertion started
			if ($taxtype == 'individual') {
				$taxDetails = $product['taxes'];
				$taxCount = count($taxDetails);
				for($j=0; $j<$taxCount; $j++) {
                                    //SalesPlatform.ru begin
                                    $taxDetails[$j]['amount'] = htmlentities(Vtiger_Currency_UIType::transformDisplayValue($taxDetails[$j]['amount'], null, true), ENT_QUOTES | ENT_HTML401);
					//$taxDetails[$j]['amount'] = Vtiger_Currency_UIType::transformDisplayValue($taxDetails[$j]['amount'], null, true);
                                    //SalesPlatform.ru end
				}
				$product['taxes'] = $taxDetails;
			}
			//Product tax details convertion ended

			$currencyFieldsList = array('taxTotal', 'netPrice', 'listPrice', 'unitPrice', 'productTotal',
										'discountTotal', 'discount_amount', 'totalAfterDiscount');
			foreach ($currencyFieldsList as $fieldName) {
                            //SalesPlatform.ru begin
                            $product[$fieldName.$i] = htmlentities(Vtiger_Currency_UIType::transformDisplayValue($product[$fieldName.$i], null, true), ENT_QUOTES | ENT_HTML401);
				//$product[$fieldName.$i] = Vtiger_Currency_UIType::transformDisplayValue($product[$fieldName.$i], null, true);
                            //SalesPlatform.ru end 
			}

			$relatedProducts[$i] = $product;
		}
		//##Product details convertion ended

		$viewer = $this->getViewer($request);
		$viewer->assign('RELATED_PRODUCTS', $relatedProducts);
		$viewer->assign('RECORD', $recordModel);
		$viewer->assign('MODULE_NAME',$moduleName);

		$viewer->view('LineItemsDetail.tpl', 'Inventory');
	}

	/**
	 * Function to get the list of Script models to be included
	 * @param Vtiger_Request $request
	 * @return <Array> - List of Vtiger_JsScript_Model instances
	 */
	function getHeaderScripts(Vtiger_Request $request) {
		$headerScriptInstances = parent::getHeaderScripts($request);

		$moduleName = $request->getModule();

		//Added to remove the module specific js, as they depend on inventory files
		$modulePopUpFile = 'modules.'.$moduleName.'.resources.Popup';
		$moduleEditFile = 'modules.'.$moduleName.'.resources.Edit';
		$moduleDetailFile = 'modules.'.$moduleName.'.resources.Detail';
		unset($headerScriptInstances[$modulePopUpFile]);
		unset($headerScriptInstances[$moduleEditFile]);
		unset($headerScriptInstances[$moduleDetailFile]);

		$jsFileNames = array(
			'modules.Inventory.resources.Popup',
            'modules.Inventory.resources.Detail',
			'modules.Inventory.resources.Edit',
			"modules.$moduleName.resources.Detail",
		);
		$jsFileNames[] = $moduleEditFile;
		$jsFileNames[] = $modulePopUpFile;
		$jsScriptInstances = $this->checkAndConvertJsScripts($jsFileNames);
		$headerScriptInstances = array_merge($headerScriptInstances, $jsScriptInstances);
		return $headerScriptInstances;
	}
}
