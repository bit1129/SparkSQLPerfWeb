package com.jd.spark.sql.perf.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@RequestMapping("/perf")
@Controller
public class PerfResultController {

@RequestMapping("/results")
@ResponseBody
public String getResults() {
    return "hello,world";
}

}
