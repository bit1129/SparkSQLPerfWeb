package com.jd.spark.sql.perf.utils;

import com.google.gson.Gson;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class Results {
    //只读取一个迭代的时间统计信息
    private static List<String> readFromFile(File file, boolean onlyFirstIteration) throws IOException {
        BufferedReader br = null;
        List<String> lines = new ArrayList<String>();
        try {
            br = new BufferedReader(new FileReader(file));
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
                if (onlyFirstIteration) {
                    break;
                }
            }
            return lines;
        } finally {
            if (br != null) {
                br.close();
            }
        }
    }

    public static String get() throws IOException {
        File resultFileDir = new File("D:/tmpdownloads/Results/RenderOnUI");
        if (!resultFileDir.exists() || !resultFileDir.isDirectory()) {
            throw new IOException(resultFileDir.getAbsolutePath() + " should exist and also be a directory");
        }
        String[] files = resultFileDir.list();
        Arrays.sort(files);
        List<String> results = new ArrayList<String>();
        for (int i = 0; i < files.length; i++) {
            List<String> lines = readFromFile(new File(resultFileDir.getAbsolutePath(), files[i]), true);
            results.addAll(lines);
        }
        return new Gson().toJson(results);

    }
}
