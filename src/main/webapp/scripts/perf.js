$(document).ready(function(evt){

    //���Ȼ�ȡҪչ�ֵ����ݣ�ÿ������Ҫչ�ֵ�Table�е�һ��
    //�������ȷ��Table������
    var url = "/perf/results"
    $.get(url)
        .success(function(responseText){
            //��responseTextת��ΪJson�����飬ÿ��Ԫ����һ�����н����Ӧ��JSON�ַ���
            var strResultArr = JSON.parse(responseText);
            var entries = [];
            for (var i = 0; i < strResultArr.length; i++) {
                var entry = JSON.parse(strResultArr[i])
                entries.push(entry)
            }

            if (entries.length <= 0) {
                //TODO : ��ʾ��������Ϣ������
                return;
            }

            //ȷ������
            var rowNumber = entries[0].resul




            //��obj��JSON����ȡ���ж��ٸ�������

        })
        .error(function(error){
        alert("Unable to access " + url +", The error is : " + error)
    })



})


