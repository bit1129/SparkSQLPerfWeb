$(document).ready(function(evt){

    var _prefix0 = function (value) {
        if (value < 10) {
            return "0" + value;
        }
        return value;
    };

    /**
     * ��Long��������ת����YYYYMMHHmmDD��ʽ
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
                htr.append("<td>" + getTime(entries[i].timestamp) +"(" + entries[i].iteration + ")" + "</td>")
            }

            //���ȼ���һ��������
            //






            //��obj��JSON����ȡ���ж��ٸ�������

        })
        .error(function(error){
        alert("Unable to access " + url +", The error is : " + error)
    })



})


