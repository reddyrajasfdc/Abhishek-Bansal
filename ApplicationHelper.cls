/* 

This class is used to create connected app with oauth
*/

public Class ApplicationHelper {
    public static String getUserSessionId(){
     String sessionId = '';
    // Refer to the Page
    PageReference reportPage = Page.sessionIDPage;
    // Get the content of the VF page
    String vfContent = reportPage.getContent().toString();
    System.debug('vfContent '+vfContent);
    // Find the position of Start_Of_Session_Id and End_Of_Session_Id
    Integer startP = vfContent.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
    endP = vfContent.indexOf('End_Of_Session_Id');
    // Get the Session Id
    sessionId = vfContent.substring(startP, endP);
    System.debug('sessionId '+sessionId);
    // Return Session Id
    return sessionId;
 }
     
     @AuraEnabled
    public static String createApp(String appName, String cEmail) {
        
        MetadataService.MetadataPort service = createService();
        
        MetadataService.ConnectedAppOauthConfig oauth = new MetadataService.ConnectedAppOauthConfig();
        //oauth.consumerKey = client_id;
        oauth.scopes = new String[] {'Api'};
        oauth.callbackUrl = 'https://www.google.com';
        
        MetadataService.ConnectedApp concApp = new MetadataService.ConnectedApp();
        concApp.fullName = appName;
        concApp.contactEmail = cEmail;
        concApp.label = appName;
        concApp.oauthConfig = oauth;
        
                
        List<MetadataService.SaveResult> results = service.createMetadata(new MetadataService.Metadata[] { concApp });
           //emp = new Employee__c();
           //emp.name = concApp.fullName;
           //insert emp;
           
           return concApp.fullName;
           
        //List<MetadataService.Error> allerrors = results[0].errors;
        
        //return allerrors[0].message;
    }
    
    public static MetadataService.MetadataPort createService()
    { 
        MetadataService.MetadataPort service = new MetadataService.MetadataPort();
        service.SessionHeader = new MetadataService.SessionHeader_element();
        service.SessionHeader.sessionId = getUserSessionId();
        return service;     
    }
    public static void retrieveConnectedApp() {
        // This only seems to work for Connected App's created in the org, not those packaged, see Workbench only created ones get listed
        MetadataService.MetadataPort service = new MetadataService.MetadataPort();
        service.SessionHeader = new MetadataService.SessionHeader_element();
        service.SessionHeader.sessionId = UserInfo.getSessionId();
        MetadataService.ConnectedApp connectedApp =
                (MetadataService.ConnectedApp)service.readMetadata('ConnectedApp', new String[] {'appName'}).getRecords()[0];
        system.debug('connectedApp = ' + connectedApp);        
    }
    
}
