package com.jd.spark.sql.perf.controllers;

import com.jd.spark.sql.perf.utils.Results;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;


@RequestMapping("/perf")
@Controller
public class PerfResultController {

    @RequestMapping("/results")
    @ResponseBody
    public String getResults() {
        try {
            return Results.get();
        } catch (IOException e) {
            return "Error: " + e.getMessage();
        }
    }
}
