$(document).ready(function(evt){
    //alert("hello,world")

    //首先获取要展现的数据，每行数据要展现到Table中的一列
    //因此首先确定Table的列数
    var url = "/perf/results"
    $.get(url)
        .success(function(responseText){
            //将responseText转换为Json串
            var obj = JSON.parse(responseText);

            //从obj的JSON串中取出有多少个计算结果

        })
        .error(function(error){
        alert("Unable to access " + url +", The error is : " + error)
    })



})


