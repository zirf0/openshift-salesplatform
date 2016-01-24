/*+***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *************************************************************************************/

jQuery.Class("Vtiger_Edit_Js",{

	//Event that will triggered when reference field is selected
	referenceSelectionEvent : 'Vtiger.Reference.Selection',

	//Event that will triggered when reference field is selected
	referenceDeSelectionEvent : 'Vtiger.Reference.DeSelection',

	//Event that will triggered before saving the record
	recordPreSave : 'Vtiger.Record.PreSave',

	refrenceMultiSelectionEvent : 'Vtiger.MultiReference.Selection',

	preReferencePopUpOpenEvent : 'Vtiger.Referece.Popup.Pre',

	editInstance : false,

    postReferenceSelectionEvent: 'Vtiger.PostReference.Selection',
    
	/**
	 * Function to get Instance by name
	 * @params moduleName:-- Name of the module to create instance
	 */
	getInstanceByModuleName : function(moduleName){
		if(typeof moduleName == "undefined"){
			moduleName = app.getModuleName();
		}
		var parentModule = app.getParentModuleName();
		if(parentModule == 'Settings'){
			var moduleClassName = parentModule+"_"+moduleName+"_Edit_Js";
			if(typeof window[moduleClassName] == 'undefined'){
				moduleClassName = moduleName+"_Edit_Js";
			}
			var fallbackClassName = parentModule+"_Vtiger_Edit_Js";
			if(typeof window[fallbackClassName] == 'undefined') {
				fallbackClassName = "Vtiger_Edit_Js";
			}
		} else {
			moduleClassName = moduleName+"_Edit_Js";
			fallbackClassName = "Vtiger_Edit_Js";
		}
		if(typeof window[moduleClassName] != 'undefined'){
			var instance = new window[moduleClassName]();
		}else{
			var instance = new window[fallbackClassName]();
		}
		return instance;
	},


	getInstance: function(){
		if(Vtiger_Edit_Js.editInstance == false){
			var instance = Vtiger_Edit_Js.getInstanceByModuleName();
			Vtiger_Edit_Js.editInstance = instance;
			return instance;
		}
		return Vtiger_Edit_Js.editInstance;
	}

},{
        
        //SalesPlatform.ru begin kladr integration
        
        /* 
         * This provides mappings of form input names, which contains 
         * integration fields on which we need apply callbacks and use it values 
         */
        
        kladrFieldsList : {
                                standartAddressFields : [
                                    {code : 'bill_code', city: 'bill_city', state: 'bill_state', region: 'bill_region', street: 'bill_street'},
                                    {code : 'ship_code', city: 'ship_city', state: 'ship_state', region: 'ship_region', street: 'ship_street'}
                                ],
                                fullAddressFields : []                      
                              },
        //SalesPLatform.ru end
        
	formElement : false,

	getForm : function() {
		if(this.formElement == false){
			this.setForm(jQuery('#EditView'));
		}
		return this.formElement;
	},

	setForm : function(element){
		this.formElement = element;
		return this;
	},

	getPopUpParams : function(container) {
		var params = {};
		var sourceModule = app.getModuleName();
		var popupReferenceModule = jQuery('input[name="popupReferenceModule"]',container).val();
		var sourceFieldElement = jQuery('input[class="sourceField"]',container);
		var sourceField = sourceFieldElement.attr('name');
		var sourceRecordElement = jQuery('input[name="record"]');
		var sourceRecordId = '';
		if(sourceRecordElement.length > 0) {
			sourceRecordId = sourceRecordElement.val();
		}

		var isMultiple = false;
		if(sourceFieldElement.data('multiple') == true){
			isMultiple = true;
		}

		var params = {
			'module' : popupReferenceModule,
			'src_module' : sourceModule,
			'src_field' : sourceField,
			'src_record' : sourceRecordId
		}

		if(isMultiple) {
			params.multi_select = true ;
		}
		return params;
	},


	openPopUp : function(e){
		var thisInstance = this;
		var parentElem = jQuery(e.target).closest('td');

		var params = this.getPopUpParams(parentElem);

		var isMultiple = false;
		if(params.multi_select) {
			isMultiple = true;
		}

		var sourceFieldElement = jQuery('input[class="sourceField"]',parentElem);

		var prePopupOpenEvent = jQuery.Event(Vtiger_Edit_Js.preReferencePopUpOpenEvent);
		sourceFieldElement.trigger(prePopupOpenEvent);

		if(prePopupOpenEvent.isDefaultPrevented()) {
			return ;
		}

		var popupInstance =Vtiger_Popup_Js.getInstance();
		popupInstance.show(params,function(data){
			var responseData = JSON.parse(data);
			var dataList = new Array();
			for(var id in responseData){
				var data = {
					'name' : responseData[id].name,
					'id' : id
				}
				dataList.push(data);
				if(!isMultiple) {
					thisInstance.setReferenceFieldValue(parentElem, data);
				}
			}

			if(isMultiple) {
                    sourceFieldElement.trigger(Vtiger_Edit_Js.refrenceMultiSelectionEvent,{'data':dataList});
			}
                sourceFieldElement.trigger(Vtiger_Edit_Js.postReferenceSelectionEvent,{'data':responseData});
		});
	},

	setReferenceFieldValue : function(container, params) {
		var sourceField = container.find('input[class="sourceField"]').attr('name');
		var fieldElement = container.find('input[name="'+sourceField+'"]');
		var sourceFieldDisplay = sourceField+"_display";
		var fieldDisplayElement = container.find('input[name="'+sourceFieldDisplay+'"]');
		var popupReferenceModule = container.find('input[name="popupReferenceModule"]').val();

		var selectedName = params.name;
		var id = params.id;

		fieldElement.val(id)
		fieldDisplayElement.val(selectedName).attr('readonly',true);
		fieldElement.trigger(Vtiger_Edit_Js.referenceSelectionEvent, {'source_module' : popupReferenceModule, 'record' : id, 'selectedName' : selectedName});

		fieldDisplayElement.validationEngine('closePrompt',fieldDisplayElement);
	},

	proceedRegisterEvents : function(){
		if(jQuery('.recordEditView').length > 0){
			return true;
		}else{
			return false;
		}
	},

	referenceModulePopupRegisterEvent : function(container){
		var thisInstance = this;
		container.on("click",'.relatedPopup',function(e){
			thisInstance.openPopUp(e);
		});
		container.find('.referenceModulesList').chosen().change(function(e){
			var element = jQuery(e.currentTarget);
			var closestTD = element.closest('td').next();
			var popupReferenceModule = element.val();
			var referenceModuleElement = jQuery('input[name="popupReferenceModule"]', closestTD);
			var prevSelectedReferenceModule = referenceModuleElement.val();
			referenceModuleElement.val(popupReferenceModule);

			//If Reference module is changed then we should clear the previous value
			if(prevSelectedReferenceModule != popupReferenceModule) {
				closestTD.find('.clearReferenceSelection').trigger('click');
			}
		});
	},

	getReferencedModuleName : function(parenElement){
		return jQuery('input[name="popupReferenceModule"]',parenElement).val();
	},

	searchModuleNames : function(params) {
		var aDeferred = jQuery.Deferred();

		if(typeof params.module == 'undefined') {
			params.module = app.getModuleName();
		}

		if(typeof params.action == 'undefined') {
			params.action = 'BasicAjax';
		}
		AppConnector.request(params).then(
			function(data){
				aDeferred.resolve(data);
			},
			function(error){
				//TODO : Handle error
				aDeferred.reject();
			}
			)
		return aDeferred.promise();
	},

	/**
	 * Function to get reference search params
	 */
	getReferenceSearchParams : function(element){
		var tdElement = jQuery(element).closest('td');
		var params = {};
		var searchModule = this.getReferencedModuleName(tdElement);
		params.search_module = searchModule;
		return params;
	},
	
	/**
	 * Function which will handle the reference auto complete event registrations
	 * @params - container <jQuery> - element in which auto complete fields needs to be searched
	 */
	registerAutoCompleteFields : function(container) {
		var thisInstance = this;
		container.find('input.autoComplete').autocomplete({
			'minLength' : '3',
			'source' : function(request, response){
				//element will be array of dom elements
				//here this refers to auto complete instance
				var inputElement = jQuery(this.element[0]);
				var searchValue = request.term;
				var params = thisInstance.getReferenceSearchParams(inputElement);
				params.search_value = searchValue;
				thisInstance.searchModuleNames(params).then(function(data){
					var reponseDataList = new Array();
					var serverDataFormat = data.result
					if(serverDataFormat.length <= 0) {
						jQuery(inputElement).val('');
						serverDataFormat = new Array({
							'label' : app.vtranslate('JS_NO_RESULTS_FOUND'),
							'type'  : 'no results'
						});
					}
					for(var id in serverDataFormat){
						var responseData = serverDataFormat[id];
						reponseDataList.push(responseData);
					}
					response(reponseDataList);
				});
			},
			'select' : function(event, ui ){
				var selectedItemData = ui.item;
				//To stop selection if no results is selected
				if(typeof selectedItemData.type != 'undefined' && selectedItemData.type=="no results"){
					return false;
				}
				selectedItemData.name = selectedItemData.value;
				var element = jQuery(this);
				var tdElement = element.closest('td');
				thisInstance.setReferenceFieldValue(tdElement, selectedItemData);
                
                var sourceField = tdElement.find('input[class="sourceField"]').attr('name');
                var fieldElement = tdElement.find('input[name="'+sourceField+'"]');

                fieldElement.trigger(Vtiger_Edit_Js.postReferenceSelectionEvent,{'data':selectedItemData});
			},
			'change' : function(event, ui) {
				var element = jQuery(this);
				//if you dont have readonly attribute means the user didnt select the item
				if(element.attr('readonly')== undefined) {
					element.closest('td').find('.clearReferenceSelection').trigger('click');
				}
			},
			'open' : function(event,ui) {
				//To Make the menu come up in the case of quick create
				jQuery(this).data('autocomplete').menu.element.css('z-index','100001');

			}
		});
	},


	/**
	 * Function which will register reference field clear event
	 * @params - container <jQuery> - element in which auto complete fields needs to be searched
	 */
	registerClearReferenceSelectionEvent : function(container) {
		container.find('.clearReferenceSelection').on('click', function(e){
			var element = jQuery(e.currentTarget);
			var parentTdElement = element.closest('td');
			var fieldNameElement = parentTdElement.find('.sourceField');
			var fieldName = fieldNameElement.attr('name');
			fieldNameElement.val('');
			parentTdElement.find('#'+fieldName+'_display').removeAttr('readonly').val('');
			element.trigger(Vtiger_Edit_Js.referenceDeSelectionEvent);
			e.preventDefault();
		})
	},

	/**
	 * Function which will register event to prevent form submission on pressing on enter
	 * @params - container <jQuery> - element in which auto complete fields needs to be searched
	 */
	registerPreventingEnterSubmitEvent : function(container) {
		container.on('keypress', function(e){
			//Stop the submit when enter is pressed in the form
			var currentElement = jQuery(e.target);
			if(e.which == 13 && (!currentElement.is('textarea'))) {
				e. preventDefault();
			}
		})
	},

	/**
	 * Function which will give you all details of the selected record
	 * @params - an Array of values like {'record' : recordId, 'source_module' : searchModule, 'selectedName' : selectedRecordName}
	 */
	getRecordDetails : function(params) {
		var aDeferred = jQuery.Deferred();
		var url = "index.php?module="+app.getModuleName()+"&action=GetData&record="+params['record']+"&source_module="+params['source_module'];
		AppConnector.request(url).then(
			function(data){
				if(data['success']) {
					aDeferred.resolve(data);
				} else {
					aDeferred.reject(data['message']);
				}
			},
			function(error){
				aDeferred.reject();
			}
			)
		return aDeferred.promise();
	},


	registerTimeFields : function(container) {
		app.registerEventForTimeFields(container);
	},
	
	referenceCreateHandler : function(container) {
		var thisInstance = this;
		var postQuickCreateSave  = function(data) {
			var params = {};
			params.name = data.result._recordLabel;
			params.id = data.result._recordId;
            thisInstance.setReferenceFieldValue(container, params);
		}

		var referenceModuleName = this.getReferencedModuleName(container);
		var quickCreateNode = jQuery('#quickCreateModules').find('[data-name="'+ referenceModuleName +'"]');
		if(quickCreateNode.length <= 0) {
			Vtiger_Helper_Js.showPnotify(app.vtranslate('JS_NO_CREATE_OR_NOT_QUICK_CREATE_ENABLED'))
		}
        quickCreateNode.trigger('click',{'callbackFunction':postQuickCreateSave});
	},

	/**
	 * Function which will register event for create of reference record
	 * This will allow users to create reference record from edit view of other record
	 */
	registerReferenceCreate : function(container) {
		var thisInstance = this;
		container.on('click','.createReferenceRecord', function(e){
			var element = jQuery(e.currentTarget);
			var controlElementTd = element.closest('td');

			thisInstance.referenceCreateHandler(controlElementTd);
		})
	},

	/**
	 * Function to register the event status change event
	 */
	registerEventStatusChangeEvent : function(container){
		var followupContainer = container.find('.followUpContainer');
		//if default value is set to Held then display follow up container
		var defaultStatus = container.find('select[name="eventstatus"]').val();
		if(defaultStatus == 'Held'){
			followupContainer.show();
		}
		container.find('select[name="eventstatus"]').on('change',function(e){
			var selectedOption = jQuery(e.currentTarget).val();
			if(selectedOption == 'Held'){
				followupContainer.show();
			} else{
				followupContainer.hide();
			}
		});
	},

	/**
	 * Function which will register basic events which will be used in quick create as well
	 *
	 */
	registerBasicEvents : function(container) {
		this.referenceModulePopupRegisterEvent(container);
		this.registerAutoCompleteFields(container);
		this.registerClearReferenceSelectionEvent(container);
		this.registerPreventingEnterSubmitEvent(container);
		this.registerTimeFields(container);
		//Added here instead of register basic event of calendar. because this should be registered all over the places like quick create, edit, list..
		this.registerEventStatusChangeEvent(container);
		this.registerRecordAccessCheckEvent(container);
		this.registerEventForPicklistDependencySetup(container);
                
                //SalesPlatform.ru begin kladr integration
                this.registerKladrIntegration(container); 
                //SalesPlatform.ru end kladr integration
	},
        
        //SalesPlatform.ru begin kladr integration
        /**
         * Check is KLADR module enabled, and if it is - register helper callbacks.
         * To check module enable - send request to it
         * @param {$} container
         * @returns {undefined}
         */
        registerKladrIntegration : function(container) {
            //We need save pointer to current object - to register KLADR handlers in callback answer function
            var parentPointer = this;
            AppConnector.request({ 
                module: 'SPKladr',
                action: 'EnterAddress',  
                mode: 'checkEnable'
            }).then(function(data) {
                if(data != null && data.success && data.result) {
                    if(parentPointer.isLocalStorageAvailible()) {
                        parentPointer.registerAddressFieldsActions(container);
                    } else {
                        alert(app.vtranslate('JS_LBL_LOCAL_STORAGE_FAIL'));
                    }
                }
            });
        },
        
        /**
         * Check support of current browser of local storage. If it not exists - kladr
         * will not to work.
         * 
         * @returns {window|Boolean|String}
         */
        isLocalStorageAvailible : function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        },
        
        /**
         * Register all needed callbacks for KLADR integration
         * @param {$} editForm
         * @returns {undefined}
         */
        registerAddressFieldsActions : function (editForm) {
                       
            /* Set of callbacks for standart address fields in modules */
            for(var currentNumber in this.kladrFieldsList.standartAddressFields) {
                this.addAddressCallback(editForm, this.kladrFieldsList.standartAddressFields[currentNumber]);
                this.addCityCallback(editForm, this.kladrFieldsList.standartAddressFields[currentNumber]);
                this.addStateCallback(editForm, this.kladrFieldsList.standartAddressFields[currentNumber]);
            }
            
            /* Callbacks for fields, which contain all address in one string */
            for(var currentNumber in this.kladrFieldsList.fullAddressFields) {
                this.addFullAddressFieldCallback(editForm, this.kladrFieldsList.fullAddressFields[currentNumber]);
            }
        },
        
        /**
         * provides autocomplete in full addres field which include city strret and house number
         * 
         * @param {$} editForm
         * @param {string} fieldName
         * @returns {undefined}
         */
        addFullAddressFieldCallback: function(editForm, fieldName) {
            var parentEntity = this;
            var requestParams = {
                module: 'SPKladr',
                action: 'EnterAddress',  
                mode: 'fullAddressTyped',
                cityRecordsLimit : 10,
                cityOffset : 0
            };
            
            editForm.find('[name="' + fieldName + '"]').autocomplete({
                delay : 300,
                minLength : 3,
                             
                source : function(request, response) {
                    var addressParts = request.term.split(",");
                    switch(addressParts.length) {

                        /* Step 1 - get city */
                        case 1:
                            requestParams.requestStep = 1;
                            requestParams.cityName = request.term;
                            parentEntity.loadCities(request, response, requestParams, fieldName);
                            break;

                        /* Step 2 - get street name in selected city */
                        case 2:  
                            requestParams.requestStep = 2;
                            requestParams.cityCode = localStorage.getItem(fieldName + 'cityCode');
                            requestParams.streetName = addressParts[1];

                            /* Request for second param - street or another small location */
                            AppConnector.request(requestParams).then(function(data) {
                                var selectValues = [];
                                if(data !== null && data.success) {
                                    selectValues = data.result;      
                                } 

                                response($.map(selectValues, function(item){
                                   item.label = addressParts[0] + ', ' + item.streetSocr + ' ' + item.streetName;
                                   item.value = item.label + ', ';

                                   /* Prepare to save item in storage on click */
                                   item.saveFieldName = fieldName + 'streetCode';
                                   item.saveFieldValue = item.streetCode;

                                   return item;
                                }));
                            });
                            break;

                        /* Step 3 - get hoouse number on selected street */
                        case 3:
                            requestParams.requestStep = 3;
                            requestParams.houseNumber = addressParts[2];
                            requestParams.streetCode = localStorage.getItem(fieldName + 'streetCode');

                            /* Get help info abount number of house */
                            AppConnector.request(requestParams).then(function(data) {
                                var selectValues = [];
                                if(data !== null && data.success) {
                                    selectValues = data.result;      
                                } 

                                response($.map(selectValues, function(item){
                                   item.label = addressParts[0] + ','  + addressParts[1] + ', ' + item.houseNumber;
                                   item.value = item.label;

                                   return item;
                                }));
                            });
                            break;

                        default:
                            response();
                            break;
                    }
                },
                
                select: function(event, selectedObject) {
                    var clickedItem = selectedObject.item;
                    
                    /* Handling first step - load more cities pagination */
                    if(clickedItem.isLoadMoreCities) {
                        requestParams.cityOffset = clickedItem.cityOffset;
                        editForm.find('[name="' + fieldName + '"]').autocomplete("search");
                        
                        /* Restore normal pagination */
                        requestParams.cityOffset = 0;
                    } else {
                        localStorage.setItem(clickedItem.saveFieldName, clickedItem.saveFieldValue);
                    } 
                }
            });
        },
        
        /**
         * Provides pagination cities loading
         * 
         * @param {Object} request
         * @param {function} response
         * @param {Object} requestParams
         * @param {string} fieldName
         * @returns {undefined}
         */
        loadCities : function(request, response, requestParams, fieldName) {
            
            /* Prepare special list value */
            var item = {
                isLoadMoreCities: true,
                value : request.term,
                cityOffset : requestParams.cityOffset,
                cityRecordsLimit : requestParams.cityRecordsLimit
            }; 
            
            /* Send request */
            AppConnector.request(requestParams).then(function(data) {
                var selectValues = [];
                if(data !== null && data.success) {
                    selectValues = data.result.selectedCities;      
                } 

                /* Format search result with delimiter */
                selectValues = $.map(selectValues, function(item){
                   item.value = item.citySocr + ' ' + item.cityName + ', ';
                   item.label = item.citySocr + ' ' + item.cityName + '(' + 
                                    item.stateSocr + ' ' + item.stateName;
                   if(item.regionName !== '') {
                       item.label += ', ' + item.regionSocr + ' ' + item.regionName;
                   }         
                   item.label += ')';

                   /* Prepare to save item in storage on click */
                   item.saveFieldName = fieldName + 'cityCode';
                   item.saveFieldValue = item.cityCode;

                   return item;
                });
                
                /* Insert special more load item if loaded full limit cities */
                if(selectValues.length === item.cityRecordsLimit) {
                    
                    /* Prepare pagination display */
                    var startNextLoadNumber = item.cityOffset + selectValues.length;
                    var endNextLoadNumber = startNextLoadNumber + item.cityRecordsLimit;
                    if(endNextLoadNumber > data.result.totalCities) {
                        endNextLoadNumber = data.result.totalCities;
                    }
                    
                    /* Increase offset and add pagination info */
                    item.cityOffset += selectValues.length;
                    item.label = "*** " + 
                        app.vtranslate("JS_LBL_LOAD_MORE_CITIES") + 
                        "(" + startNextLoadNumber + "-" + endNextLoadNumber + " " + 
                        app.vtranslate("JS_LBL_OF") +  " " + data.result.totalCities + ")" + 
                        " ***";
                    
                    selectValues.push(item);
                }

                response(selectValues);
            });
        },
        
        /*
         * Callback on street field edit - provides help to enter street, city, state and code by click mouse on needed element.
         * @param {$} editForm - form on thich address fields are placed
         * @param {Object} kladrState - address fields set of current helper by kladr 
         * @returns {undefined}
         */
        addAddressCallback : function(editForm, kladrState) {
            editForm.find('[name="' + kladrState.street + '"]').attr('placeholder', app.vtranslate('JS_LBL_HELP_ADDRESS_TYPE'));
            editForm.find('[name="' + kladrState.street + '"]').autocomplete({
                delay : 400,
                minLength : 3,

                source : function(request, response){ 
                    if(localStorage.getItem(kladrState.city + 'cityCode') != '') {  
                        
                        /* Common request params */
                        var requestParams = {
                            module: 'SPKladr',
                            action: 'EnterAddress',  
                            mode: 'fullAddressTyped'
                        };

                        var addressParts = request.term.split(",");
                        switch(addressParts.length) {
                            
                            /* Step 1 - get street in selected city */
                            case 1:
                                requestParams.requestStep = 2;
                                requestParams.streetName = request.term;
                                requestParams.cityCode = localStorage.getItem(kladrState.city + 'cityCode');
                                AppConnector.request(requestParams).then(function(data) {
                                    var selectValues = [];
                                    if(data !== null && data.success) {
                                        selectValues = data.result;      
                                    } 

                                    /* Format search result with delimiter */
                                    response($.map(selectValues, function(item){
                                       item.label = item.streetSocr + ' ' + item.streetName;
                                       item.value = item.label + ', ';

                                       /* Prepare to save item in storage on click */
                                       item.saveStreetCode = true;

                                       return item;
                                    }));
                                });
                                break;
                            
                            /* Step 2 - get house number */
                            case 2:
                                requestParams.requestStep = 3;
                                requestParams.houseNumber = addressParts[1];
                                requestParams.streetCode = localStorage.getItem(kladrState.street + 'streetCode');

                                /* Request for second param - street or another small location  */
                                AppConnector.request(requestParams).then(function(data) {
                                    var selectValues = [];
                                    if(data !== null && data.success) {
                                        selectValues = data.result;      
                                    } 
                                    
                                    /* Format before display */
                                    response($.map(selectValues, function(item){
                                       item.label = addressParts[0] + ', ' + item.houseNumber;
                                       item.value = item.label;
                                       item.autofill = true;

                                       return item;
                                    }));
                                });
                                break;

                            default:
                                response();
                                break;
                        }
                    } else {
                        response();
                    }
                },

                select: function(event, selectedObject) {
                    
                    /* Street was selected - need save it code */
                    if(selectedObject.item.saveStreetCode) {
                        localStorage.setItem(kladrState.street + 'streetCode', selectedObject.item.streetCode);
                    }
                    
                    /* Adds info of clicked item in other address fields */
                    if(selectedObject.item.autofill) {
                        editForm.find('[name="' + kladrState.code + '"]').val(selectedObject.item.mailIndex);
                        } 
                    }
            });
        },
        
        /**
         * Add helper callback on city field. Provides helped select on typing in city input field.
         * @param {$} editForm - form on thich address fields are placed
         * @param {Object} kladrState - address fields set of current helper by kladr
         * @returns {undefined}
         */
        addCityCallback : function(editForm, kladrState) { 
            var parentEntity = this;
            var requestParams = {
                module: 'SPKladr',
                action: 'EnterAddress',  
                mode: 'fullAddressTyped',
                cityRecordsLimit : 10,
                cityOffset : 0,
                requestStep: 1
            };
            
            editForm.find('[name="' + kladrState.city + '"]').autocomplete({
                delay : 100,
                minLength : 3,
                
                source : function(request, response){
                    requestParams.cityName = request.term;
                    parentEntity.loadCities(request, response, requestParams, kladrState.city);
                },
                
                select : function(event, selectedObject) {
                    var clickedItem = selectedObject.item;
                    
                    /* Handling first step - load more cities pagination */
                    if(clickedItem.isLoadMoreCities) {   
                        requestParams.cityOffset = clickedItem.cityOffset;
                        editForm.find('[name="' + kladrState.city + '"]').autocomplete("search");
                        requestParams.cityOffset = 0; 
                    } else {
                        selectedObject.item.value = clickedItem.citySocr + ' ' + clickedItem.cityName;
                        localStorage.setItem(kladrState.city + 'cityCode', clickedItem.cityCode);
                        editForm.find('[name="' + kladrState.state + '"]').val(clickedItem.stateSocr + ' ' + clickedItem.stateName);
                        editForm.find('[name="' + kladrState.region + '"]').val(clickedItem.regionSocr + ' ' + clickedItem.regionName); 
                    } 
                }
            });
        },
        
        /**
         * Add helper callback on state field. Provides helped select on typing in state input field.
         * @param {$} editForm - form on thich address fields are placed
         * @param {Object} kladrState - address fields set of current helper by kladr
         * @returns {undefined}
         */
        addStateCallback : function(editForm, kladrState) {
            editForm.find('[name="' + kladrState.state + '"]').autocomplete({
                delay : 100,
                minLength : 2,
                
                source : function(request, response){
                    AppConnector.request({ 
                        module: 'SPKladr',
                        action: 'EnterAddress',
                        mode: 'stateTyped',
                        stateName: request.term
                    }).then(function(data) {
                            var selectValues = [];
                            if(data !== null && data.success) {
                                selectValues = data.result;      
                            }
                            
                            response($.map(selectValues, function(item){
                               item.value = item.stateSocr + ' ' + item.stateName;
                               item.label = item.value; 

                               return item;
                            }));
                    });
                }
            });
        },
        //SalesPlatform.ru end
        
	/**
	 * Function to register event for image delete
	 */
	registerEventForImageDelete : function(){
		var formElement = this.getForm();
		var recordId = formElement.find('input[name="record"]').val();
		formElement.find('.imageDelete').on('click',function(e){
			var element = jQuery(e.currentTarget);
			var parentTd = element.closest('td');
			var imageUploadElement = parentTd.find('[name="imagename[]"]');
			var fieldInfo = imageUploadElement.data('fieldinfo');
			var mandatoryStatus = fieldInfo.mandatory;
			var imageId = element.closest('div').find('img').data().imageId;
			element.closest('div').remove();
			var exisitingImages = parentTd.find('[name="existingImages"]');
			if(exisitingImages.length < 1 && mandatoryStatus){
				formElement.validationEngine('detach');
				imageUploadElement.attr('data-validation-engine','validate[required,funcCall[Vtiger_Base_Validator_Js.invokeValidation]]');
				formElement.validationEngine('attach');
			}
            
			if(formElement.find('[name=imageid]').length != 0) {
				var imageIdValue = JSON.parse(formElement.find('[name=imageid]').val());
				imageIdValue.push(imageId);
				formElement.find('[name=imageid]').val(JSON.stringify(imageIdValue));
			} else {
				var imageIdJson = [];
				imageIdJson.push(imageId);
				formElement.append('<input type="hidden" name="imgDeleted" value="true" />');
				formElement.append('<input type="hidden" name="imageid" value="'+JSON.stringify(imageIdJson)+'" />');
			}
		});
	},

	triggerDisplayTypeEvent : function() {
		var widthType = app.cacheGet('widthType', 'narrowWidthType');
		if(widthType) {
			var elements = jQuery('#EditView').find('td');
			elements.addClass(widthType);
		}
	},

	registerSubmitEvent: function() {
		var editViewForm = this.getForm();

		editViewForm.submit(function(e){
            
            //SalesPlatform begin
            var mode = jQuery(e.currentTarget).find('[name="mode"]').val();
            //SalesPlatform.ru end
            
			//Form should submit only once for multiple clicks also
			if(typeof editViewForm.data('submit') != "undefined") {
				return false;
			} else {
				var module = jQuery(e.currentTarget).find('[name="module"]').val();
				if(editViewForm.validationEngine('validate')) {
					//Once the form is submiting add data attribute to that form element
					editViewForm.data('submit', 'true');
                    
                    //SalesPlatform begin
                    if(!sp_js_editview_checkBeforeSave(module, editViewForm, mode)) {
                        return false;
                    }
                    //SalesPlatform end
                    
						//on submit form trigger the recordPreSave event
						var recordPreSaveEvent = jQuery.Event(Vtiger_Edit_Js.recordPreSave);
						editViewForm.trigger(recordPreSaveEvent, {'value' : 'edit'});
					if(recordPreSaveEvent.isDefaultPrevented()) {
						//If duplicate record validation fails, form should submit again
						editViewForm.removeData('submit');
						e.preventDefault();
					}
				} else {
					//If validation fails, form should submit again
					editViewForm.removeData('submit');
					// to avoid hiding of error message under the fixed nav bar
					app.formAlignmentAfterValidation(editViewForm);
				}
			}
		});
	},

	/*
	 * Function to check the view permission of a record after save
	 */

	registerRecordAccessCheckEvent : function(form) {

		form.on(Vtiger_Edit_Js.recordPreSave, function(e, data) {
			var assignedToSelectElement = jQuery('[name="assigned_user_id"]',form);
			if(assignedToSelectElement.data('recordaccessconfirmation') == true) {
				return;
			}else{
				if(assignedToSelectElement.data('recordaccessconfirmationprogress') != true) {
					var recordAccess = assignedToSelectElement.find('option:selected').data('recordaccess');
					if(recordAccess == false) {
						var message = app.vtranslate('JS_NO_VIEW_PERMISSION_AFTER_SAVE');
						Vtiger_Helper_Js.showConfirmationBox({'message' : message}).then(
							function(e) {
								assignedToSelectElement.data('recordaccessconfirmation',true);
								assignedToSelectElement.removeData('recordaccessconfirmationprogress');
								form.append('<input type="hidden" name="returnToList" value="true" />');
								form.submit();
							},
							function(error, err){
								assignedToSelectElement.removeData('recordaccessconfirmationprogress');
								e.preventDefault();
							});
						assignedToSelectElement.data('recordaccessconfirmationprogress',true);
					} else {
						return true;
					}
				}
			}
			e.preventDefault();
		});
	},

	/**
	 * Function to register event for setting up picklistdependency
	 * for a module if exist on change of picklist value
	 */
	registerEventForPicklistDependencySetup : function(container){
		var picklistDependcyElemnt = jQuery('[name="picklistDependency"]',container);
		if(picklistDependcyElemnt.length <= 0) {
			return;
		}
		var picklistDependencyMapping = JSON.parse(picklistDependcyElemnt.val());

		var sourcePicklists = Object.keys(picklistDependencyMapping);
		if(sourcePicklists.length <= 0){
			return;
		}

		var sourcePickListNames = "";
		for(var i=0;i<sourcePicklists.length;i++){
            //SalesPlatform.ru begin
			sourcePickListNames += 'select[name*="'+sourcePicklists[i]+'"],';
            //sourcePickListNames += '[name="'+sourcePicklists[i]+'"],';
            //SalesPlatform.ru end
		}
		var sourcePickListElements = container.find(sourcePickListNames);
        
        //SalesPlatform.ru begin
        var thisInstance = this;
        //SalesPlatform.ru end
		sourcePickListElements.on('change', function(e){
            //SalesPlatform.ru begin
            thisInstance.onPicklistChange(e, container);
            
            //var currentElement = jQuery(e.currentTarget);
			//var sourcePicklistname = currentElement.attr('name');
            //
			//var configuredDependencyObject = picklistDependencyMapping[sourcePicklistname];
			//var selectedValue = currentElement.val();
			//var targetObjectForSelectedSourceValue = configuredDependencyObject[selectedValue];
			//var picklistmap = configuredDependencyObject["__DEFAULT__"];
            //
			//if(typeof targetObjectForSelectedSourceValue == 'undefined'){
			//	targetObjectForSelectedSourceValue = picklistmap;
			//}
			//jQuery.each(picklistmap,function(targetPickListName,targetPickListValues){
			//	var targetPickListMap = targetObjectForSelectedSourceValue[targetPickListName];
			//	if(typeof targetPickListMap == "undefined"){
			//		targetPickListMap = targetPickListValues;
			//	}
			//	var targetPickList = jQuery('[name="'+targetPickListName+'"]',container);
			//	if(targetPickList.length <= 0){
			//		return;
			//	}
            //
			//	var listOfAvailableOptions = targetPickList.data('availableOptions');
			//	if(typeof listOfAvailableOptions == "undefined"){
			//		listOfAvailableOptions = jQuery('option',targetPickList);
			//		targetPickList.data('available-options', listOfAvailableOptions);
			//	}
            //
			//	var targetOptions = new jQuery();
			//	var optionSelector = [];
			//	optionSelector.push('');
			//	for(var i=0; i<targetPickListMap.length; i++){
			//		optionSelector.push(targetPickListMap[i]);
			//	}
			//	
			//	jQuery.each(listOfAvailableOptions, function(i,e) {
			//		var picklistValue = jQuery(e).val();
			//		if(jQuery.inArray(picklistValue, optionSelector) != -1) {
			//			targetOptions = targetOptions.add(jQuery(e));
			//		}
			//	})
			//	var targetPickListSelectedValue = '';
			//	var targetPickListSelectedValue = targetOptions.filter('[selected]').val();
			//	targetPickList.html(targetOptions).val(targetPickListSelectedValue).trigger("liszt:updated");
            //})
            //SalesPlatform.ru end
		});

		//To Trigger the change on load
		sourcePickListElements.trigger('change');
	},
    
    //SalesPlatform.ru begin
    onPicklistChange : function(e, container) {
        
        /* Prepare data of dependency and selected values of picklist */
        var currentElement = $(e.currentTarget);
        var sourcePicklistName = currentElement.attr('name').replace("[]", "");
        var picklistDependencyElement = $('[name="picklistDependency"]', container);
        var picklistDependencyMap = JSON.parse(picklistDependencyElement.val());
        var configuredDependencyObject = picklistDependencyMap[sourcePicklistName];
        var selectedValue = currentElement.val();
        var dependencyForSelectedValues = {};
        
        /* Get selectable values for dependent picklist */
        if($.isArray(selectedValue)) {
            dependencyForSelectedValues = this.getDependentMultipicklistValues(selectedValue, configuredDependencyObject);
        } else {
            dependencyForSelectedValues = this.getDependentPicklistValues(selectedValue, configuredDependencyObject);
        }
        var picklistMap = configuredDependencyObject["__DEFAULT__"];
        if(typeof dependencyForSelectedValues == 'undefined'){
            dependencyForSelectedValues = picklistMap;
        }
        
        /* Reconfigurate dependent picklists */
        $.each(picklistMap, function(targetPickListName, targetPickListValues){
            var targetPickListMap = dependencyForSelectedValues[targetPickListName];
            if(typeof targetPickListMap == "undefined"){
                targetPickListMap = targetPickListValues;
            }
            
            /* Replace options with remember selected */
            var targetPickList = $('select[name*="' + targetPickListName + '"]', container); 
            var listOfAvailableOptions = targetPickList.data('availableOptions');
            if(typeof listOfAvailableOptions == "undefined"){
                listOfAvailableOptions = $('option', targetPickList);
                targetPickList.data('available-options', listOfAvailableOptions);
            }
            
            var currentSelectedValues = $(targetPickList).val();
            var optionSelector = [];
            optionSelector.push('');
            for(var i=0; i<targetPickListMap.length; i++){
                optionSelector.push(targetPickListMap[i]);
            }
            
            var targetOptions = new $();
            $.each(listOfAvailableOptions, function(i,e) {
                $(e).prop("selected", false);
                var picklistValue = $(e).val();
                if($.inArray(picklistValue, optionSelector) != -1) {
                    targetOptions = targetOptions.add($(e));
                }
            });
            targetPickList.html(targetOptions);
            
            /* Set selected options which include in dependency */
            if(currentSelectedValues != null) {
                if($.isArray(currentSelectedValues)) {
                    for(var selectIndex = 0; selectIndex < currentSelectedValues.length; selectIndex++) {
                        var selectedValue = currentSelectedValues[selectIndex];
                        if($.inArray(selectedValue, targetPickListMap) !== -1) {
                            $("option[value='" + selectedValue + "']", targetPickList).prop("selected", true);
                        }
                    }
                } else {
                    targetPickList.val(currentSelectedValues);
                }
            }
            
            /* Refresh select2 view */
            if($(targetPickList).attr('name').indexOf("[]") !== -1) {
                app.getSelect2ElementFromSelect(targetPickList).select2('destroy'); 
                app.showSelect2ElementView(targetPickList);
            } else {
                targetPickList.trigger("liszt:updated");
            }
        })
    },
    
    /**
     * Return dependent picklist values for changend multipicklist
     * 
     * @param {type} selectedValues
     * @param {type} configuredDependencyObject
     * @returns {unresolved}
     */
    getDependentMultipicklistValues : function(selectedValues, configuredDependencyObject) {
        var dependentPicklistValuesMap = {};
        for(var selectedValueIndex = 0; selectedValueIndex < selectedValues.length; selectedValueIndex++) {
            var currentValue = selectedValues[selectedValueIndex];
            var targetPicklistValuesMap = configuredDependencyObject[currentValue];

            /* Iterate all values in dependency */
            for(var masterPicklistValue in targetPicklistValuesMap) {
                this.mergeMultiPicklistDependencyValues(dependentPicklistValuesMap, masterPicklistValue,  targetPicklistValuesMap);
            }
        }
        
        return dependentPicklistValuesMap;
    },
    
    /**
     * Merges select values for dependent picklist
     * @param {type} dependentPicklistValues
     * @param {type} masterPicklistValue
     * @param {type} targetPicklistValuesMap
     * @returns {undefined}
     */
    mergeMultiPicklistDependencyValues : function(dependentPicklistValues, masterPicklistValue, targetPicklistValuesMap) {
        if(masterPicklistValue in dependentPicklistValues) {
            var mergeValues = dependentPicklistValues[masterPicklistValue];
            var additionalSelectValues = [];
            var maxMapIndex = 0;
            var targetValues = targetPicklistValuesMap[masterPicklistValue];
            for(var targetValueIndex = 0; targetValueIndex < targetValues.length; targetValueIndex++) {
                var targetValue = targetValues[targetValueIndex];
                var valueNotIncluded = true;
                for(var finalTargetProp = 0; finalTargetProp < mergeValues.length; finalTargetProp++) {
                    if(targetValue === mergeValues[finalTargetProp]) {
                        valueNotIncluded = false;
                    }
                    maxMapIndex = finalTargetProp;
                }

                if(valueNotIncluded) {
                    additionalSelectValues.push(targetValue);
                }
            }

            for(var index = 0; index < additionalSelectValues.length; index++) {
                mergeValues[maxMapIndex + index + 1] = additionalSelectValues[index];
            }
            dependentPicklistValues[masterPicklistValue] = mergeValues;
        } else {
            dependentPicklistValues[masterPicklistValue] = targetPicklistValuesMap[masterPicklistValue];
        }
    },
    
    getDependentPicklistValues : function(selectedValue, configuredDependencyObject) {
        return configuredDependencyObject[selectedValue];
    },
    //SalesPlatform.ru end
    
	 registerLeavePageWithoutSubmit : function(form){
        InitialFormData = form.serialize();
        window.onbeforeunload = function(e){
            if (InitialFormData != form.serialize() && form.data('submit') != "true") {
                return app.vtranslate("JS_CHANGES_WILL_BE_LOST");
            }
        };
    },
    
    //SalesPlatform.ru begin
 	registerSpMobilePhoneFields : function(container) { 
        $('.spMobilePhone', container).inputmask("+9{11,15}"); 
    }, 
    //SalesPlatform.ru end
    
	registerEvents: function(){
		var editViewForm = this.getForm();
		var statusToProceed = this.proceedRegisterEvents();
		if(!statusToProceed){
			return;
		}

		this.registerBasicEvents(this.getForm());
		this.registerEventForImageDelete();
		this.registerSubmitEvent();
		this.registerLeavePageWithoutSubmit(editViewForm);
        //SalesPlatform.ru begin
        this.registerSpMobilePhoneFields(editViewForm);
        //SalesPlatform.ru end
        
		app.registerEventForDatePickerFields('#EditView');
		
		var params = app.validationEngineOptions;
		params.onValidationComplete = function(element,valid){
			if(valid){
				var ckEditorSource = editViewForm.find('.ckEditorSource');
				if(ckEditorSource.length > 0){
					var ckEditorSourceId = ckEditorSource.attr('id');
					var fieldInfo = ckEditorSource.data('fieldinfo');
					var isMandatory = fieldInfo.mandatory;
					var CKEditorInstance = CKEDITOR.instances;
					var ckEditorValue = jQuery.trim(CKEditorInstance[ckEditorSourceId].document.getBody().getText());
					if(isMandatory && (ckEditorValue.length === 0)){
						var ckEditorId = 'cke_'+ckEditorSourceId;
						var message = app.vtranslate('JS_REQUIRED_FIELD');
						jQuery('#'+ckEditorId).validationEngine('showPrompt', message , 'error','topLeft',true);
						return false;
					}else{
						return valid;
					}
				}
				return valid;
			}
			return valid
		}
		editViewForm.validationEngine(params);

		this.registerReferenceCreate(editViewForm);
	//this.triggerDisplayTypeEvent();
	}
});

// SalesPlatform.ru begin
var gValidationCall='';

if (document.all)

	var browser_ie=true

else if (document.layers)

	var browser_nn4=true

else if (document.layers || (!document.all && document.getElementById))

	var browser_nn6=true

var gBrowserAgent = navigator.userAgent.toLowerCase();

function getObj(n,d) {

	var p,i,x;

	if(!d) {
		d=document;
	}

	if(n != undefined) {
		if((p=n.indexOf("?"))>0&&parent.frames.length) {
			d=parent.frames[n.substring(p+1)].document;
			n=n.substring(0,p);
		}
	}

	if(d.getElementById) {
		x=d.getElementById(n);
		// IE7 was returning form element with name = n (if there was multiple instance)
		// But not firefox, so we are making a double check
		if(x && x.id != n) x = false;
	}

	for(i=0;!x && i<d.forms.length;i++) {
		x=d.forms[i][n];
	}

	for(i=0; !x && d.layers && i<d.layers.length;i++) {
		x=getObj(n,d.layers[i].document);
	}

	if(!x && !(x=d[n]) && d.all) {
		x=d.all[n];
	}

	if(typeof x == 'string') {
		x=null;
	}

	return x;
}

/** Javascript dialog box utility functions **/
VtigerJS_DialogBox = {
	_olayer : function(toggle) {
		var olayerid = "__vtigerjs_dialogbox_olayer__";
		VtigerJS_DialogBox._removebyid(olayerid);

		if(typeof(toggle) == 'undefined' || !toggle) return;

		var olayer = document.getElementById(olayerid);
		if(!olayer) {
			olayer = document.createElement("div");
			olayer.id = olayerid;
			olayer.className = "small veil";
			olayer.style.zIndex = (new Date()).getTime();

			// Avoid zIndex going beyond integer max
			// http://trac.vtiger.com/cgi-bin/trac.cgi/ticket/7146#comment:1
			olayer.style.zIndex = parseInt((new Date()).getTime() / 1000);

			// In case zIndex goes to negative side!
			if(olayer.style.zIndex < 0) olayer.style.zIndex *= -1;
			if (browser_ie) {
				olayer.style.height = document.body.offsetHeight + (document.body.scrollHeight - document.body.offsetHeight) + "px";
			} else if (browser_nn4 || browser_nn6) {
				olayer.style.height = document.body.offsetHeight + "px";
			}
			olayer.style.width = "100%";
			document.body.appendChild(olayer);

			var closeimg = document.createElement("img");
			closeimg.src = 'test/logo/popuplay_close.png';
			closeimg.alt = 'X';
			closeimg.style.right= '10px';
			closeimg.style.top  = '5px';
			closeimg.style.position = 'absolute';
			closeimg.style.cursor = 'pointer';
			closeimg.onclick = VtigerJS_DialogBox.unblock;
			olayer.appendChild(closeimg);
		}
		if(olayer) {
			if(toggle) olayer.style.display = "block";
			else olayer.style.display = "none";
		}
		return olayer;
	},
	_removebyid : function(id) {
		if($(id)) $(id).remove();
	},
	unblock : function() {
		VtigerJS_DialogBox._olayer(false);
	},
	block : function(opacity) {
		if(typeof(opactiy)=='undefined') opacity = '0.3';
		var olayernode = VtigerJS_DialogBox._olayer(true);
		olayernode.style.opacity = opacity;
	},
	hideprogress : function() {
		VtigerJS_DialogBox._olayer(false);
		VtigerJS_DialogBox._removebyid('__vtigerjs_dialogbox_progress_id__');
	},
	progress : function(imgurl) {
		VtigerJS_DialogBox._olayer(true);
		if(typeof(imgurl) == 'undefined') imgurl = 'themes/images/plsWaitAnimated.gif';

		var prgbxid = "__vtigerjs_dialogbox_progress_id__";
		var prgnode = document.getElementById(prgbxid);
		if(!prgnode) {
			prgnode = document.createElement("div");
			prgnode.id = prgbxid;
			prgnode.className = 'veil_new';
			prgnode.style.position = 'absolute';
			prgnode.style.width = '100%';
			prgnode.style.top = '0';
			prgnode.style.left = '0';
			prgnode.style.display = 'block';

			document.body.appendChild(prgnode);

			prgnode.innerHTML =
			'<table border="5" cellpadding="0" cellspacing="0" align="center" style="vertical-align:middle;width:100%;height:100%;">' +
			'<tr><td class="big" align="center"><img src="'+ imgurl + '"></td></tr></table>';

		}
		if(prgnode) prgnode.style.display = 'block';
	},
	hideconfirm : function() {
		VtigerJS_DialogBox._olayer(false);
		VtigerJS_DialogBox._removebyid('__vtigerjs_dialogbox_alert_boxid__');
	},
	confirm : function(msg, onyescode) {
		VtigerJS_DialogBox._olayer(true);

		var dlgbxid = "__vtigerjs_dialogbox_alert_boxid__";
		var dlgbxnode = document.getElementById(dlgbxid);
		if(!dlgbxnode) {
			dlgbxnode = document.createElement("div");
			dlgbxnode.style.display = 'none';
			dlgbxnode.className = 'veil_new small';
			dlgbxnode.id = dlgbxid;
			dlgbxnode.innerHTML =
			'<table cellspacing="0" cellpadding="18" border="0" class="options small">' +
			'<tbody>' +
			'<tr>' +
			'<td nowrap="" align="center" style="color: rgb(255, 255, 255); font-size: 15px;">' +
			'<b>'+ msg + '</b></td>' +
			'</tr>' +
			'<tr>' +
			'<td align="center">' +
			'<input type="button" style="text-transform: capitalize;" onclick="$(\''+ dlgbxid + '\').hide();VtigerJS_DialogBox._olayer(false);VtigerJS_DialogBox._confirm_handler();" value="'+ alert_arr.YES + '"/>' +
			'<input type="button" style="text-transform: capitalize;" onclick="$(\''+ dlgbxid + '\').hide();VtigerJS_DialogBox._olayer(false)" value="' + alert_arr.NO + '"/>' +
			'</td>'+
			'</tr>' +
			'</tbody>' +
			'</table>';
			document.body.appendChild(dlgbxnode);
		}
		if(typeof(onyescode) == 'undefined') onyescode = '';
		dlgbxnode._onyescode = onyescode;
		if(dlgbxnode) dlgbxnode.style.display = 'block';
	},
	_confirm_handler : function() {
		var dlgbxid = "__vtigerjs_dialogbox_alert_boxid__";
		var dlgbxnode = document.getElementById(dlgbxid);
		if(dlgbxnode) {
			if(typeof(dlgbxnode._onyescode) != 'undefined' && dlgbxnode._onyescode != '') {
				eval(dlgbxnode._onyescode);
			}
		}
	}
};

//Search element in array
function in_array(what, where) {
    for(var i=0; i < where.length; i++) {
        if(what == where[i]) { 
            return true;
        }
    }    
    return false;
}

//Empty check
function empty (mixed_var) {

  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === "object") {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}

//Json check
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

//Check before save implementation
function sp_js_editview_checkBeforeSave(module, thisForm, mode) {
    var fldvalObjectArr = {};
    var createMode;
    if(mode == 'edit') {
        createMode = 'edit';
    } else {
        createMode = 'create';
    }
    
    for (var i = 0; i < fieldname.length; i++) {
        var obj = getObj(fieldname[i]);
        if (empty(obj)) {
            obj = getObj(fieldname[i]+"[]");
        }
        
        if(!empty(obj)) {
            if(obj.tagName == 'SELECT' && obj.hasAttribute('multiple')) {
                var selectValuesArr = {};
                for (var j = 0; j < obj.options.length; j++) {
                    if (obj.options[j].selected) {
                        selectValuesArr[j] = obj.options[j].value;
                    }
                }
                
                fldvalObjectArr[fieldname[i]] = selectValuesArr;
            } else if(obj[1] != null && obj[1].getAttribute('type') == 'checkbox') {
                var fieldvalue;
                if(obj[1].checked) {
                    fieldvalue = 1;
                } else {
                    fieldvalue = 0;
                }
                
                fldvalObjectArr[fieldname[i]] = fieldvalue;
            } else {
                var fieldvalue = getObj(fieldname[i]).value;
                
                fldvalObjectArr[fieldname[i]] = fieldvalue;
            }
        } 
       
    }            
    
    var data = encodeURIComponent(JSON.stringify(fldvalObjectArr));               

    var urlstring = "index.php?module="+module+"&action=CheckBeforeSave&checkBeforeSaveData="+data+"&EditViewAjaxMode=true&CreateMode="+createMode;
    if(mode == 'edit') {
        urlstring = urlstring + "&id=" + crmId;
    }
    
    var params = {  
        url : urlstring, 
        async : false, 
        data : {} 
    }; 
    
    var continue_fl;    // true - continue, false - break  
    AppConnector.request(params).then( function (responseObj) {
	if(!empty(responseObj)) {                        
            if(responseObj.response === undefined) {                                  
                continue_fl = true;
            }
            if(responseObj.response === "OK") {
                if (responseObj.message !== undefined && !empty(responseObj.message)) {
                    alert(responseObj.message);
                }
                continue_fl = true;
            } else if(responseObj.response === "ALERT") {
                VtigerJS_DialogBox.unblock();
                if (responseObj.message !== undefined) {
                    alert(responseObj.message);
                } else {
                    alert('Alert');
                }
                thisForm.removeData('submit');
                continue_fl = false;
            } else if(responseObj.response === "CONFIRM") {
                var confirmMessage;
                if (responseObj.message !== undefined) {
                    confirmMessage =responseObj.message;
                } else {
                    confirmMessage = 'Confirm';
                }
                if (confirm(confirmMessage)) {
                    continue_fl = true;
                } else {
                    VtigerJS_DialogBox.unblock();
                    thisForm.removeData('submit');
                    continue_fl = false;
                }
            } else {
                continue_fl = true;
            }
        } else {
            continue_fl = true;
        }
    });
    return continue_fl;
}
//SalesPlatform.ru end