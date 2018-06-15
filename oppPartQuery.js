var json = require('./sortedDevicesAndPartNumbers.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

console.log(json);
for (i in json) {
    var partIds = json[i]
    for (partId in partIds) {
        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/pt_designwinopportunitypartSet?$select=issi_EndCustomer,pt_Quantity&$filter=pt_MarketingPartId/Id eq (guid'" +
            partId + "')", true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function() {
            if (this.readyState === 4) {
                this.onreadystatechange = null;
                if (this.status === 200) {
                    var returned = JSON.parse(this.responseText).d;
                    var results = returned.results;
                    for (var i = 0; i < results.length; i++) {
                        var issi_EndCustomer = results[i].issi_EndCustomer;
                        var pt_Quantity = results[i].pt_Quantity;
                    }
                } else {
                    alert(this.statusText);
                }
            }
        };
        req.send();
    }
}