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

            //entries数组的每个元素记录了一次运行的时间统计信息。
            //一次运行由运行改benchmark的timestamp和该次运行的第几次迭代确定
            //entries数组的个数决定了表格的列数(表格的列由<QueryName>、<Performance>加每次迭代(一列))
            var entries = [];
            for (var i = 0; i < strResultArr.length; i++) {
                var entry = JSON.parse(strResultArr[i])
                entries.push(entry)
            }

            if (entries.length <= 0) {
                return;
            }

            var tbody = $("#resultTable tbody")
            //创建表头
            var htr = $("<tr></tr>")
            tbody.append(htr)
            htr.append("<td width='10%'>Query Name</td>")
            htr.append("<td width='10%'>Performance</td>")

            //一次运行的一个迭代占据一列
            for (var i = 0; i < entries.length; i++) {
                htr.append("<td>" + getTime(entries[i].timestamp) + "(" + entries[i].iteration + ")" + "</td>")
            }

            //创建行，最外层的行数由运行的查询决定
            var rowNum = entries[0].results.length

            //对每个查询进行计算
            for (var i = 0; i < rowNum; i++) {
                var row = $("<tr></tr>")
                tbody.append(row)
                var breakDownRows = entries[0].results[i].breakDown == null ? 0 : entries[0].results[i].breakDown.length
                var rowsPerQuery = 5 + breakDownRows
                row.append("<td rowspan='" + rowsPerQuery + "'>" + entries[0].results[i].name + "</td>")
                row.append("<td>ParsingTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" + entries[j].results[i].parsingTime + "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>analysisTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" + entries[j].results[i].analysisTime + "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>optimizationTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" + entries[j].results[i].optimizationTime + "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>planningTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" + entries[j].results[i].planningTime + "</td>");
                }

                row = $("<tr></tr>")
                tbody.append(row)
                row.append("<td>executionTime</td>")
                for (var j = 0; j < entries.length; j++) {
                    row.append("<td>" + entries[j].results[i].executionTime + "</td>");
                }

                //获得每个查询包含的Break的数目
                //
                var breakDownRow = entries[0].results[i].breakDown.length;
                for (var k = 0; k < breakDownRow; k++) {
                    row = $("<tr></tr>")
                    var breakDown = entries[0].results[i].breakDown[k]
                    row.append("<td>" + breakDown.nodeName + "(" + breakDown.index + ")" + "</td>")
                    tbody.append(row)
                    for (var j = 0; j < entries.length; j++) {
                        var breakDown = entries[j].results[i].breakDown[k]
                            row.append("<td>" + breakDown.executionTime + "</td>");
                    }
                }
            }
        })
        .error(function (error) {
            alert("Unable to access " + url + ", The error is : " + error)
        })
})


