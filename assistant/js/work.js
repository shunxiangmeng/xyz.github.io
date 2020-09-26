
function getAndDisplayWork()
{
    http("GET", "https://kajchdqo.engine.lncld.net/1.1/classes/learn", "", "", function(data){
        results = data.results;
        //console.log(results);
        for (var i = 0; i < results.length; i++){
            var updateTimeStr = results[i].updatedAt.replace(/T/i," ").replace(/Z/i,"");
            var timestamp = new Date(Date.parse(updateTimeStr)).getTime();
            results[i].timestamp = timestamp;
        }
        for (var i = 0; i < results.length; i++){
            for (var j = i + 1; j < results.length; j++){
                if (results[i].timestamp < results[j].timestamp){
                    var tmp = results[j];
                    results[j] = results[i];
                    results[i] = tmp;
                }
            }
        }
        //console.log(results);
        var tbody = $("#learnItem");
        tbody.empty();
        var percentage = 0;
        for (var i = 0; i < results.length; i++)
        {
            var percent = results[i].z_percentage;
            if (results[i].b_isBook){
                percent = results[i].e_pageNow / results[i].d_pageAll * 100;
                if (percent >= 100)
                    percent = 100;
            }
            var tbodyData = "";
            tbodyData += "<tr>";
            tbodyData += "<td>" + (i + 1) + "</td>";
            tbodyData += "<td>" + results[i].a_name + "</td>";
            tbodyData += "<td>" + results[i].d_pageAll + "</td>";
            tbodyData += "<td>" + results[i].e_pageNow + "</td>";
            tbodyData += "<td>" + results[i].x_done + "</td>";
            tbodyData += "<td>" + results[i].y_todo + "</td>";
            tbodyData += "<td>" + percent.toFixed(2) + "%</td>";
            tbodyData += "</tr>";  
            tbody.append(tbodyData); 
            percentage = percentage + percent;
        }

        percentage = percentage / results.length;
        $( "#progressbar" ).progressbar({
            value: 0,
            change:function(){
                $(".progress-label").text($("#progressbar").progressbar("value").toFixed(3)+"%");
              },
          });

        $('#progressbar').progressbar("option","value", percentage);
    });
}