$(document).ready(function(evt){

    /**
     * ��Long��������ת����YYYYMMHHmmDD��ʽ
     * @param timestamp
     */
    function toDate(timestamp) {

    }

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

            //ȷ��������entries.length��ʾҪչ������ͳ����Ϣ������

            //����header
            var tbody = $("#resultTable tbody")
            var htr = $("<tr></tr>")
            tbody.append(htr)
            htr.append("<td width=��10%��>Query Name</td>")
            htr.append("<td width='10%'>Performance</td>")
            //TODO ����ÿһ�еĿ��
            for(var i = 0; i < entries.length; i++) {
                htr.append("<td>" + entries[i].timestamp +"," + entries[i].iteration + "</td>")
            }

            //���ȼ���һ��������
            //






            //��obj��JSON����ȡ���ж��ٸ�������

        })
        .error(function(error){
        alert("Unable to access " + url +", The error is : " + error)
    })



})


