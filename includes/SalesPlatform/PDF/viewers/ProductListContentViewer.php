<?php
/*+**********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  SalesPlatform vtiger CRM Open Source
 * The Initial Developer of the Original Code is SalesPlatform.
 * Portions created by SalesPlatform are Copyright (C) SalesPlatform.
 * All Rights Reserved.
 ************************************************************************************/
include_once 'includes/SalesPlatform/PDF/viewers/SPContentViewer.php';

class SalesPlatform_PDF_ProductListDocumentContentViewer extends SalesPlatform_PDF_SPContentViewer {

	function display($parent) {

		$models = $this->contentModels;

		$totalModels = count($models);
                $totalGoods = 0;
                $totalServices = 0;
		$pdf = $parent->getPDF();
		$pdf->setPageOrientation($this->orientation);
		$pdf->SetAutoPageBreak(true, 10);
		
		$parent->createPage();
		$contentFrame = $parent->getContentFrame();
		
		try {
		    $template = new Aste_Template($this->template);

		    $table_head = $template->getBlock('table_head');
		    $content = $table_head->fetch();

		    for ($index = 0; $index < $totalModels; ++$index) {
			$model = $models[$index];
			
			$contentHeight = 1;

			try {
                            $table_row = $template->getBlock('table_row', true);
                    	    foreach($this->documentModel->keys() as $key) {
                        	$table_row->setVar($key, $this->documentModel->get($key));
                    	    }
                            foreach($model->keys() as $key) {
                                $table_row->setVar($key, $model->get($key));
                            }
                            $content .= $table_row->fetch();
                        }catch(Aste_Exception $e) {
                        }

                        try {
                            if($model->get('entityType') == 'Products') {
                                $table_row = $template->getBlock('goods_row', true);
                    		foreach($this->documentModel->keys() as $key) {
                        	    $table_row->setVar($key, $this->documentModel->get($key));
                    		}
                                foreach($model->keys() as $key) {
                                    $table_row->setVar($key, $model->get($key));
                                }
                                $content .= $table_row->fetch();
                                $totalGoods++;
                            }
                        }catch(Aste_Exception $e) {
                        }
			
                        try {
                            if($model->get('entityType') == 'Services') {
                                $table_row = $template->getBlock('services_row', true);
                    		foreach($this->documentModel->keys() as $key) {
                        	    $table_row->setVar($key, $this->documentModel->get($key));
                    		}
                                foreach($model->keys() as $key) {
                                    $table_row->setVar($key, $model->get($key));
                                }
                                $content .= $table_row->fetch();
                                $totalServices++;
                            }
                        }catch(Aste_Exception $e) {
                        }
		    }
		
		
		    $summary = $template->getBlock('summary');
                    foreach($this->documentModel->keys() as $key) {
                        $summary->setVar($key, $this->documentModel->get($key));
                    }
		    foreach($this->contentSummaryModel->keys() as $key) {
    		        $summary->setVar($key, $this->contentSummaryModel->get($key));
    		    }
    		    $summary->setVar('summaryTotalItems', $totalModels);
    		    $summary->setVar('summaryTotalGoods', $totalGoods);
    		    $summary->setVar('summaryTotalServices', $totalServices);
		    $content .= $summary->fetch();

		    $ending = $template->getBlock('ending');
		    foreach($this->documentModel->keys() as $key) {
    		        $ending->setVar($key, $this->documentModel->get($key));
    		    }
		    $content .= $ending->fetch();

		    $pdf->writeHTMLCell(0, 0, $contentFrame->x, $contentFrame->y, $content);
		} catch(Aste_Exception $e) {
		}

	}

}