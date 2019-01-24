({
    saveModal : function(component, event, helper) {
        if( component.find("AppID").get("v.label") != 'Submit'){
            
            component.set("v.showScreen","2")
            component.find("AppID").set("v.label",'Submit');
            component.find("AppID").set("v.disabled",true);
        }
        
        if(component.find("AppID").get("v.label") == 'Submit' && component.get("v.captureDetail") == 'Unlock'){
           
            var action = component.get("c.createApp");
              action.setParams({ 
                    appName : component.get("v.input1"),
                    cEmail : component.get("v.input2") 
                });
               
                  action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    alert("Connected App Name"+response.getReturnValue());
                }
                else if (state === "INCOMPLETE") {
                    alert("incomplete");
                }
                    else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }
            });
            $A.enqueueAction(action); 
            }
            
        },
        
        cancelModal : function(component, event, helper){
            
            var cmpTarget = component.find('modalbox');
            var cmpBack = component.find('modalbackdrop');
            $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
            $A.util.removeClass(cmpBack, 'slds-backdrop--open');
        },
        
        doInit: function (component, event, helper){
            let vfOrigin = "https://reddyraja-dev-ed.my.salesforce.com";
            window.addEventListener("message", function(event) {
                console.log(event.data);
                
                if (event.origin == vfOrigin) {
                    
                    // Not the expected origin: Reject the message!
                    return;
                } 
                
                if (event.data == "Unlock"){ 
                    component.set("v.captureDetail","Unlock");
                    component.find("AppID").set("v.disabled",false);
                }            
            }, false);   
        }
    })
