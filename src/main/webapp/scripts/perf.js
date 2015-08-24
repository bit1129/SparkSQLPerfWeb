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
            var  rowNum = entries[0].results.length

            for (var i = 0; i < rowNum; i++) {
                var row = $("<tr></tr>")
                tbody.append(row)
                var rowsPerRow = 5 + entries[0].results[i]. breakDown.length
                row.append("<td rowspan='" + rowsPerRow + "'>" + entries[0].results[i].name  + "</td>")
                row.append("<td>ParsingTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" +  entries[j].results[0].parsingTime +  "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>analysisTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" +  entries[j].result[0].analysisTime +  "</td>");
                }


            }


        })
        .error(function (error) {
            alert("Unable to access " + url + ", The error is : " + error)
        })


})


