package com.jd.spark.sql.perf.utils;

import com.google.gson.Gson;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

//TODO Ŀǰ��ʵ���Ǵ�ָ����Ŀ¼��ȡ���������������ֱ�Ӵ�HDFS�ϻ�ȡ
public class Results {
    public static String get() throws IOException {
        //��ȡ�ļ�����

        BufferedReader br = null;
        List<String> results = new ArrayList<String>();
        try {
            br = new BufferedReader(new FileReader(new File("D:\\tmpdownloads\\Results\\2\\part-00000")));
            String line = null;
            while ((line = br.readLine()) != null) {
                results.add(line);
            }
            return new Gson().toJson(results);

        } finally {
            if (br != null) {
                br.close();
            }
        }

    }
}
