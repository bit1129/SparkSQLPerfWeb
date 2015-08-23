$(document).ready(function(evt){

    var _prefix0 = function (value) {
        if (value < 10) {
            return "0" + value;
        }
        return value;
    };

    /**
     * 将Long类型日期转换成YYYYMMHHmmDD格式
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
            var day = _prefix0( d.getDate())
            var hour = _prefix0(d.getHours())
            var min = _prefix0(d.getMinutes())
            var sec = _prefix0(d.getSeconds())

            return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
        }

    //首先获取要展现的数据，每行数据要展现到Table中的一列
    //因此首先确定Table的列数
    var url = "/perf/results"

    $.get(url)
        .success(function(responseText){
            //将responseText转换为Json串数组，每个元素是一个运行结果对应的JSON字符串
            var strResultArr = JSON.parse(responseText);
            var entries = [];
            for (var i = 0; i < strResultArr.length; i++) {
                var entry = JSON.parse(strResultArr[i])
                entries.push(entry)
            }

            if (entries.length <= 0) {
                //TODO : 显示无数据信息，返回
                return;
            }

            //确定列数：entries.length表示要展现运行统计信息的列数

            //构造header
            var tbody = $("#resultTable tbody")
            var htr = $("<tr></tr>")
            tbody.append(htr)
            htr.append("<td width=‘10%’>Query Name</td>")
            htr.append("<td width='10%'>Performance</td>")
            //TODO 计算每一列的宽度
            for(var i = 0; i < entries.length; i++) {
                htr.append("<td>" + getTime(entries[i].timestamp) +"(" + entries[i].iteration + ")" + "</td>")
            }

            //首先计算一共多少行
            //






            //从obj的JSON串中取出有多少个计算结果

        })
        .error(function(error){
        alert("Unable to access " + url +", The error is : " + error)
    })



})


