package com.onebeld.networkbudgetanalyzer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactForwardController {
    @GetMapping("{path:^(?!api|public|assets|css|js|images|swagger)[^\\.]*}/**")
    public String handleForward() {
        return "forward:/";
    }
}
