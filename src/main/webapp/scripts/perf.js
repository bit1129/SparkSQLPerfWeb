$(document).ready(function(evt){
    //alert("hello,world")

    //���Ȼ�ȡҪչ�ֵ����ݣ�ÿ������Ҫչ�ֵ�Table�е�һ��
    //�������ȷ��Table������
    var url = "/perf/results"
    $.get(url)
        .success(function(responseText){
            //��responseTextת��ΪJson��
            var obj = JSON.parse(responseText);

            //��obj��JSON����ȡ���ж��ٸ�������

        })
        .error(function(error){
        alert("Unable to access " + url +", The error is : " + error)
    })



})


