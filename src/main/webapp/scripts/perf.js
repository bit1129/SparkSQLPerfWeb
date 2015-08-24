$(document).ready(function (evt) {

    var _prefix0 = function (value) {
        if (value < 10) {
            return "0" + value;
        }
        return value;
    };

    /**
     * @param timestamp
     */
    function getTime(time) {
        var d = null;
        if (time instanceof  Date) {
            d = new Date();
        } else {
            d = new Date(time)
        }
        var year = _prefix0(d.getFullYear())
        var month = _prefix0(d.getMonth() + 1)
        var day = _prefix0(d.getDate())
        var hour = _prefix0(d.getHours())
        var min = _prefix0(d.getMinutes())
        var sec = _prefix0(d.getSeconds())

        return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
    }

    var url = "/perf/results"

    $.get(url)
        .success(function (responseText) {
            var strResultArr = JSON.parse(responseText);
            var entries = [];
            for (var i = 0; i < strResultArr.length; i++) {
                var entry = JSON.parse(strResultArr[i])
                entries.push(entry)
            }

            if (entries.length <= 0) {
                return;
            }

            var tbody = $("#resultTable tbody")
            var htr = $("<tr></tr>")
            tbody.append(htr)
            htr.append("<td width='10%'>Query Name</td>")
            htr.append("<td width='10%'>Performance</td>")
            for (var i = 0; i < entries.length; i++) {
                htr.append("<td>" + getTime(entries[i].timestamp) + "(" + entries[i].iteration + ")" + "</td>")
            }

            //创建行，行数由运行的查询决定
            //
            var  rowNum = entries[0].results.length

            for (var i = 0; i < rowNum; i++) {
                var row = $("<tr></tr>")
                tbody.append(row)
                var breakDownRows =  entries[0].results[i]. breakDown == null ? 0 : entries[0].results[i]. breakDown.length
                var rowsPerQuery = 5 + breakDownRows
                row.append("<td rowspan='" + rowsPerQuery + "'>" + entries[0].results[i].name  + "</td>")
                row.append("<td>ParsingTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" +  entries[j].results[0].parsingTime +  "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>analysisTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" +  entries[j].results[0].analysisTime +  "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>optimizationTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" +  entries[j].results[0].optimizationTime +  "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>planningTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" +  entries[j].results[0].planningTime +  "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>executionTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" +  entries[j].results[0].executionTime +  "</td>");
                }

                for(var k = 0; k < entries[i].results[0].breakDown.length; k++) {
                    var breakDown = entries[i].results[0].breakDown[k]
                    row = $("<tr></tr>")
                    tbody.append(row)
                    row.append("<td>"+ breakDown.nodeName +"("  +breakDown.index + ")" +  "</td>")
                    for (var j = 0; j < entries.length; j++) {
                        row.append("<td>" +  entries[i].results[0].breakDown.executionTime +  "</td>");
                    }
                }











            }


        })
        .error(function (error) {
            alert("Unable to access " + url + ", The error is : " + error)
        })


})


