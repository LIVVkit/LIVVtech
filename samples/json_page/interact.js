/**
 * When the page is loaded, do some stuff
 */
$(document).ready(function() {
    $('.Verification').append(drawVerSummary(summary.LIVV.Verification.Summary));
    $('.Validation').append(drawValSummary(summary.LIVV.Validation.Summary));
    flipTable("#validationSummary");
});

/**
 * Draws the verification summary
 */
function drawVerSummary(data) {
    html = "<h1>Verification</h1>";
    
    for (var category in data) {
        html += "<table>";
        
        // Get a list of all of the headers
        for (var test in data[category]) {
            headers = [];
            for (var v in data[category][test]) {
                headers.push(v);
            }
        }
        headers = unique(headers);
        
        // Draw the headers
        html += "<tr><th>"+category+"</th>";
        for (var i=0; i<headers.length; i++) {
          html += "<th>" + headers[i] + "</th>";  
        }
        html += "</tr>";
        
        // Fill in the table
        for (var test in data[category]) {    
            html += "<tr> <td>" + test + "</td>";
            for (var i=0; i<headers.length; i++) {
                var inner_td = "class=maybe>No data available.";
                 
                if (data[category][test].hasOwnProperty(headers[i])) {
                    switch(headers[i]) {
                        case "BitForBit":
                            var b4b = data[category][test][headers[i]];
                            if (b4b[0] == b4b[1]){
                                inner_td = "class=good>" + b4b[0] + " of " + b4b[1];
                            } else {
                                inner_td = "class=bad>" + b4b[0] + " of " + b4b[1];
                            }
                            break;
                        case "ConfigMatched":
                            var cfg = data[category][test][headers[i]];
                            if (cfg[0] == cfg[1]) {
                                inner_td = "class=good>" + cfg[0] + " of " + cfg[1];
                            } else {
                                inner_td = "class=bad>" + cfg[0] + " of " + cfg[1];
                            }
                            break;
                        default:
                            inner_td = ">" + data[category][test][headers[i]];
                    }
                }
                html += "<td " + inner_td + "</td>"
            }
            html += "</tr>";
        }
        html += "</tr></table>";
    }
    return html;
}

/**
 * Draw the validation summary
 */
function drawValSummary(data) {
    html = "<h1> Validation </h1><table id=validationSummary>";
    
    for (var category in data) {
       html += "<tr><td class=fakeHeader>" + category + "</td>";
       for (var validation in data[category]["Validations"]) {
            html += "<td>" + data[category]["Validations"][validation] + "</td>";
       }
       html += "</tr>";
    }
    html += "</table>";
    return html;
}

/**
 * Flips a table from horizontal to vertical layout
 */
function flipTable(id) {
    $(id).each(function() {
        var $this = $(this);
        var newrows = [];
        $this.find("tr").each(function(){
            var i = 0;
            $(this).find("td").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                newrows[i].append($(this));
            });
        });
        $this.find("tr").remove();
        $.each(newrows, function(){
            $this.append(this);
        });
    });
    return false;
}

/**
 *  Takes an array and weeds out duplicate entries
 */
function unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i])) {
           a.push(arr[i]);
           u[arr[i]] = 1;
        }
    }
    return a;
}
