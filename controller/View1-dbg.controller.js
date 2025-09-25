var string = "";
var task   = "";
var approval_lvl = "";
sap.ui.define(
	[
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
    "sap/ui/core/message/Message",
    "sap/ui/core/MessageType",
    "sap/ui/core/ValueState",
    "sap/m/MessageToast",
    "sap/ui/core/library"
   ], 
   
   function (Controller,JSONModel, BindingMode, Message, MessageType , ValueState , MessageToast, library) {
	"use strict";

	return Controller.extend("ZGBC_FLEET_RETURN_APPROVE.ZGBC_FLEET_RETURN_APPROVE.controller.View1", {
	onInit: function () {
		            var oMessageManager,oView;
		            oView = this.getView();
		            oMessageManager = sap.ui.getCore().getMessageManager();
		            oView.setModel(oMessageManager.getMessageModel(), "message");
		            var oData = {
		            	         ApprovalLvl:"",
		            	         DeductionAmount:"",
		            	         Comments:"",
		            	         FsviInspectionCleared:"",
		            	         FsviDeductionApplicable:"",
		            	         InspectionCleared:"",
		            	         DeductionApplicable:"",
		            	         UnitReturned:"",
		            	         TammUpdated:"",
		            	         CcUpdated:""
		                        };
		             this.oLocalModel =  new sap.ui.model.json.JSONModel(oData);
		             oView.setModel(this.oLocalModel,"localModel");
		            
		             var approvalCheck = {
		              	                  ApproveRequestVisible:false,
		              	                  ApprovalChecksVisible:false,
		            	                  DeductionApplicable:false,
		            	                  DeductionAmountVisible:false,
		            	                  InspectionPerformed:false,
		            	                  UnitReturned:false,
		            	                  TammUpdatedVisbile:false,
		            	                  CCUpdatedVisible:false
		                                };
		            this.oLocalModel3 = new sap.ui.model.json.JSONModel(approvalCheck);
		            oView.setModel(this.oLocalModel3,"localModel3");     
		            
					var url = window.location.href;
					//var pieces = complete_url.split("?");
					var pieces = url.split("?");
					var length = pieces.length;
					length = length - 1;
					var param1 = pieces[length].split("&");
					var param2 = param1[0].split("=");
					string = param2[1]; 
					var RequestId = string;//.substr(0, 10);
					
				    param2 = param1[1].split("=");
					string = param2[1]; 
					var Workitemid = string;//.substr(0, 12);
					
					param2 = param1[2].split("=");
					string = param2[1]; 
					var Task_id  = string;//.substr(0, 12);
				 
				    //Get the Approval Level and Task ID from the backend 
		             var sPath = "/WorkitemSet('" +Workitemid+ "')";
				     var oModel = oView.getModel();
				     var that = this;

				     oModel.read(sPath,
				                        {
					                  	 success: function(oData2, response2){
					                 	 that.getView().getModel("localModel").setProperty("/ApprovalLvl", oData2.ApprovalLvl);
					                 	 that.getView().getModel("localModel").setProperty("/DeductionAmount", oData2.DeductionAmount);
					                 	 that.getView().getModel("localModel").setProperty("/FsviInspectionCleared", oData2.FsviInspectionCleared);
					                 	 that.getView().getModel("localModel").setProperty("/FsviDeductionApplicable", oData2.FsviDeductionApplicable);
					                 	 that.getView().getModel("localModel").setProperty("/InspectionCleared", oData2.InspectionCleared);
					                 	 that.getView().getModel("localModel").setProperty("/DeductionApplicable", oData2.DeductionApplicable);
					                 	 that.getView().getModel("localModel").setProperty("/UnitReturned", oData2.UnitReturned);
					                 	 that.getView().getModel("localModel").setProperty("/TammUpdated", oData2.TammUpdated);
					                 	 that.getView().getModel("localModel").setProperty("/CcUpdated", oData2.CcUpdated);
					                 	 approval_lvl = that.getView().getModel("localModel").getProperty("/ApprovalLvl");
					                                                    	},
					                     error: function () {
					                		               }
		                               	});
		            
		            task = Task_id;
		            sPath = "/FleetReturnHeaderSet('" +RequestId+ "')";
		            oModel = oView.getModel();
		            that = this;

		            oModel.read(sPath,
		                        {
                                urlParameters: {
                               "$expand": "ReturnHeaderToItemNav"
                                               },
			                 	success: function(oData1, response1){
				                       	    var oModel3 = new sap.ui.model.json.JSONModel(oData1);
					                        var osf = that.getView().byId("IdEmpDetail");
					                        osf.setModel(oModel3);
					                        var osf2 = that.getView().byId("IdVehicleSelection");
					                        osf2.setModel(oModel3);
                                            
			                                                  
                                            if( approval_lvl === "FSV" || approval_lvl === "FS1" ||  approval_lvl === "FM1" || approval_lvl === "HDR" || approval_lvl === "FS2" || approval_lvl === "FM2" || approval_lvl === "FIN" )
                                            {
                                               that.getView().getModel("localModel3").setProperty("/ApprovalChecksVisible",true);
                                               if( approval_lvl=== "FSV" )
                                                {
                                                	//Save button visible
                                                	that.getView().getModel("localModel3").setProperty("/ApproveRequestVisible",true);
                                                    //Set visibility of the inspection performed
                                                	that.getView().getModel("localModel3").setProperty("/InspectionPerformed",true);
                                                	//Set the value of the checkbox
                                                	var inspection_check_value = this.getView().getModel("localModel").getProperty("/FsviInspectionCleared");
                                                	if(inspection_check_value === 'X')
                                                	   {
                                                	    	that.getView().byId("idfleetcheck12").setSelected(true);
                                                	    }
                                                	 else{ 
                                                	    	that.getView().byId("idfleetcheck12").setSelected(false);
                                                        }
                                                }       
                                                if( approval_lvl=== "FS1" )
                                                {
                                                	//Save button visible
                                                	that.getView().getModel("localModel3").setProperty("/ApproveRequestVisible",true);
                                                	//Deduction applicable checkbox visible
                                                	that.getView().getModel("localModel3").setProperty("/DeductionApplicable",true);
                                                	//Inspection performed checkbox visible
                                                	that.getView().getModel("localModel3").setProperty("/InspectionPerformed",true);
                                                	//Get activities performed from the backend and map to the UI
                                                	inspection_check_value = that.getView().getModel("localModel").getProperty("/InspectionCleared");
                                                	var deduction_check_value  = that.getView().getModel("localModel").getProperty("/DeductionApplicable");
                                                	if(inspection_check_value === 'X')
                                                	   {
                                                	    	that.getView().byId("idfleetcheck12").setSelected(true);
                                                	    }
                                                	 else{ 
                                                	    	 that.getView().byId("idfleetcheck12").setSelected(false);
                                                        }
                                                    if(deduction_check_value === 'X')
                                                	   {
                                                	    	that.getView().byId("idfleetcheck1").setSelected(true);
                                                	        that.getView().getModel("localModel3").setProperty("/DeductionAmountVisible",true);
                                                	    }
                                                	 else{ 
                                                	    	 that.getView().byId("idfleetcheck1").setSelected(false);
                                                        }    
                                                	
                                                }
                                                if( approval_lvl=== "FM1" )
                                                {
                                                	//Save button visible
                                                	that.getView().getModel("localModel3").setProperty("/ApproveRequestVisible",true);
                                                	//Deduction applicable checkbox visible
                                                	that.getView().getModel("localModel3").setProperty("/DeductionApplicable",true);
                                                	//Inspection performed checkbox visible
                                                	that.getView().getModel("localModel3").setProperty("/InspectionPerformed",true);
                                                	//Deduction amount input field visible
                                                	that.getView().getModel("localModel3").setProperty("/DeductionAmountVisible",true);
                                                	
                                                	//Get the value from the backend and map to the ui
                                                	inspection_check_value = that.getView().getModel("localModel").getProperty("/InspectionCleared");
                                                	deduction_check_value  = that.getView().getModel("localModel").getProperty("/DeductionApplicable");
                                                	
                                                	 if(deduction_check_value === 'X')
                                                	   {
                                                	    	that.getView().byId("idfleetcheck1").setSelected(true);
                                                	    }
                                                	 else{ 
                                                	    	 that.getView().byId("idfleetcheck1").setSelected(false);
                                                        } 
                                                	if(inspection_check_value === 'X')
                                                	   {
                                                	    	 that.getView().byId("idfleetcheck12").setSelected(true);
                                                	    }
                                                	 else{ 
                                                	    	 that.getView().byId("idfleetcheck12").setSelected(false);
                                                        }
                                                      //Both the checkboxes are disabled  
                                                      that.getView().byId("idfleetcheck1").setEnabled(false);  
                                                      that.getView().byId("idfleetcheck12").setEnabled(false);   
                                                      //Deduction amount field should be enabled
                                                       that.getView().byId("idDeductionAmount").setEnabled(true);
             
		
					                 	                   
			
                                              	 }
                                              	 if( approval_lvl=== "HDR" )
                                                {
                                                	//Save button in-visible
                                                	that.getView().getModel("localModel3").setProperty("/ApproveRequestVisible",false);
                                                	//Deduction applicable checkbox visible
                                                	that.getView().getModel("localModel3").setProperty("/DeductionApplicable",true);
                                                	//Inspection performed checkbox visible
                                                	that.getView().getModel("localModel3").setProperty("/InspectionPerformed",true);
                                                	//Deduction amount input field visible
                                                	that.getView().getModel("localModel3").setProperty("/DeductionAmountVisible",true);
                                                	
                                                	//Get the value from the backend and map to the ui
                                                	inspection_check_value = that.getView().getModel("localModel").getProperty("/InspectionCleared");
                                                    deduction_check_value  = that.getView().getModel("localModel").getProperty("/DeductionApplicable");
                                                	 if(deduction_check_value === 'X')
                                                	   {
                                                	    	 that.getView().byId("idfleetcheck1").setSelected(true);
                                                	    }
                                                	 else{ 
                                                	    	 that.getView().byId("idfleetcheck1").setSelected(false);
                                                        } 
                                                	if(inspection_check_value === 'X')
                                                	   {
                                                	    	 that.getView().byId("idfleetcheck12").setSelected(true);
                                                	    }
                                                	 else{ 
                                                	    	 that.getView().byId("idfleetcheck12").setSelected(false);
                                                        }
                                                      //Both the checkboxes are disabled  
                                                      that.getView().byId("idfleetcheck1").setEnabled(false);  
                                                      that.getView().byId("idfleetcheck12").setEnabled(false);   
                                                      //Deduction amount field should be disabled
                                                      that.getView().byId("idDeductionAmount").setEditable(false);
                                              	 }
	                                                if( approval_lvl === "FS2" )
	                                                {
	                                                	//Save button visible
                                                	    that.getView().getModel("localModel3").setProperty("/ApproveRequestVisible",true);
                                                	    //Get the value from the backend and map to the UI
	                                                	var unit_return_value  = that.getView().getModel("localModel").getProperty("/UnitReturned");
                                                        var Tamm_updated_value  = that.getView().getModel("localModel").getProperty("/TammUpdated");
                                                        //make the 2 checkboxes visible
	                                                	that.getView().getModel("localModel3").setProperty("/UnitReturned",true);
	                                                	that.getView().getModel("localModel3").setProperty("/TammUpdatedVisbile",true);
	                                                	 if(unit_return_value === 'X')
		                                                	   {
		                                                	    	that.getView().byId("idfleetcheck13").setSelected(true);
		                                                	    }
	                                                	 else{ 
	                                                	       	    that.getView().byId("idfleetcheck13").setSelected(false);
	                                                        } 
	                                                   	 if(Tamm_updated_value === 'X')
	                                                	   {
	                                                	    	that.getView().byId("idfleetcheck14").setSelected(true);
	                                                	    }
	                                                	 else{ 
	                                                	    	 that.getView().byId("idfleetcheck14").setSelected(false);
	                                                        }
	                                                }
	                                                 if( approval_lvl === "FM2" )
	                                                {
	                                                	//Save button in-visible
                                                	    that.getView().getModel("localModel3").setProperty("/ApproveRequestVisible",false);
                                                	    //Get the value from the backend and map to the UI
	                                                	unit_return_value  = that.getView().getModel("localModel").getProperty("/UnitReturned");
                                                        Tamm_updated_value  = that.getView().getModel("localModel").getProperty("/TammUpdated");
                                                        //make the 2 checkboxes visible
	                                                	that.getView().getModel("localModel3").setProperty("/UnitReturned",true);
	                                                	that.getView().getModel("localModel3").setProperty("/TammUpdatedVisbile",true);
	                                                	 if(unit_return_value === 'X')
		                                                	   {
		                                                	    	that.getView().byId("idfleetcheck13").setSelected(true);
		                                                	    }
	                                                	 else{ 
	                                                	    	    that.getView().byId("idfleetcheck13").setSelected(false);
	                                                        } 
	                                                   	 if(Tamm_updated_value === 'X')
	                                                	   {
	                                                	    	    that.getView().byId("idfleetcheck14").setSelected(true);
	                                                	    }
	                                                	 else{ 
	                                                	    	 that.getView().byId("idfleetcheck14").setSelected(false);
	                                                        }
	                                                  //Both the checkboxes are disabled  
                                                      that.getView().byId("idfleetcheck13").setEnabled(false);  
                                                      that.getView().byId("idfleetcheck14").setEnabled(false);      
	                                                }
	                                                if( approval_lvl === "FIN" )
	                                                {
	                                                	//Save button in-visible
                                                	    that.getView().getModel("localModel3").setProperty("/ApproveRequestVisible",true);
	                                                	that.getView().getModel("localModel3").setProperty("/CCUpdatedVisible",true);	
	                                                	var cc_updated =  that.getView().getModel("localModel").getProperty("/CcUpdated");
	                                                	 if(cc_updated === 'X')
	                                                	   {
	                                                	    	 that.getView().byId("idfincheck11").setSelected(true);
	                                                	    }
	                                                	 else{ 
	                                                	    	 that.getView().byId("idfincheck11").setSelected(false);
	                                                        }
	                                                }
                                                
                                            }
                                            else
                                            {
                                            	that.getView().getModel("localModel3").setProperty("/ApprovalChecksVisible",false);
                                            	
                                            }
                                            
    			                 	},
						   		error: function () {
                                            that.getView().getModel("localModel").setProperty("/ApproveRequestVisible",false);
								     	    sap.m.MessageToast.show("No Data retreived");
							                      	}

                               	});
                     },
                     
                     onApprove  : function () {
                     	 var comments = this.getView().getModel("localModel").getProperty("/Comments");
                     	 var request_id = this.getView().byId("idRequestId").getText();
                         var chk1 = " ";
                         var chk2 = " ";
                         var chk3 = " ";
                         var chk4 = " ";
                         var chk5 = " ";
                         var deduct_amount = "0.000";
                         if	( approval_lvl === 'FSV' )
                         {
                             chk2     = this.getView().byId("idfleetcheck12").getSelected();
                         if( chk2 === true )
                           {
                           	chk2 = "X";
                           }
                         else
                          {
                         	chk2 = " ";
                          }
                         }  
                         
                         if	( approval_lvl === 'FS1' )
                         {
                         chk1 = this.getView().byId("idfleetcheck1").getSelected();
                         if( chk1 === true )
                           {
                           	chk1 = "X";
                           }
                         else
                          {
                         	chk1 = " ";
                          }
                          deduct_amount = this.getView().byId("idDeductionAmount").getValue();
                          
                         chk2     = this.getView().byId("idfleetcheck12").getSelected();
                         if( chk2 === true )
                           {
                           	chk2 = "X";
                           }
                         else
                          {
                         	chk2 = " ";
                          }
                         }  
                         
                         if	( approval_lvl === 'FM1' )
                         {
                         chk1 = this.getView().byId("idfleetcheck1").getSelected();
                         if( chk1 === true )
                           {
                           	chk1 = "X";
                           }
                         else
                          {
                         	chk1 = " ";
                          }
                          deduct_amount = this.getView().byId("idDeductionAmount").getValue();
                       
                         }  
                          
                         if	( approval_lvl === 'FS2' )
                         { 
                         chk3     = this.getView().byId("idfleetcheck13").getSelected();
                         if( chk3 === true )
                           {
                           	chk3 = "X";
                           }
                         else
                          {
                         	chk3 = " ";
                          }
                          
                         chk4     = this.getView().byId("idfleetcheck14").getSelected();
                         if( chk4 === true )
                           {
                           	chk4 = "X";
                           }
                         else
                          {
                         	chk4 = " ";
                          }
                         } 
                         
                         if	( approval_lvl === 'FIN' )
                         {
                         chk5     = this.getView().byId("idfincheck11").getSelected();
                         if( chk5 === true )
                           {
                           	chk5 = "X";
                           }
                         else
                          {
                         	chk5 = " ";
                          }
                         } 

                     	 var approve_request = {
                     	 	                    RequestId   : request_id,
                     	 	                    ApprovalLvl : approval_lvl,
                     	 	                    Comments    : comments,
                     	 	                    TaskId      : task, 
                     	 	                    DeductionApplicable : chk1,
                     	 	                    DeductionAmount     : deduct_amount,
                     	 	                    InspectionCleared   : chk2,
                     	 	                    UnitReturned        : chk3,
                     	 	                    TammUpdated         : chk4,
                     	 	                    CcUpdated           : chk5
                     	                        };
                     	    var oModel = this.getView().getModel();
		                	var that   = this;                      
                     	    oModel.create("/ApproveSet", approve_request,{
                     	                                            success: function(oData , response){
                     	    	                                              sap.m.MessageToast.show("Service Vehicle Request Has Been Saved Successfully");
                     	    	                                              that.getView().getModel("localModel3").setProperty("/ApproveRequestVisible",false);
                     	                                                                               },  
                     	                                             error: function(oError) {
                     	                                             	         var error_msg =  jQuery.parseJSON(oError.responseText).error.message.value;
										    		                             sap.m.MessageToast.show(error_msg);
										                                         return;
												                                            } 
                     	    	
                     	    });                                   
                     	
                     },
                    
                     showDeductionAmount  : function () { 
                       var chk1 = this.getView().byId("idfleetcheck1").getSelected();
                       if( chk1 === true)
                       {
                       		this.getView().getModel("localModel3").setProperty("/DeductionAmountVisible",true);
                       }
                       else
                       {
                            this.getView().getModel("localModel3").setProperty("/DeductionAmountVisible",false);
                       }
                    }  
                     
	});
});