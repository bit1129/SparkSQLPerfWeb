package com.jd.spark.sql.perf.utils;

import com.google.gson.Gson;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

//TODO 目前的实现是从指定的目录读取，更合理的做法是直接从HDFS上获取
public class Results {
    public static String get() throws IOException {
        //读取文件内容

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
