package <%= groupId %>.configuration;

import com.myarch.webflux.web.config.SwaggerConfigHelper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig implements WebFluxConfigurer {
    private static final String INFO_TITLE = "INFO_TITLE";
    private static final String INFO_DESCRIPTION = "INFO_DESCRIPTION";

    @Bean
    public Docket infoApiProfit() {
        return SwaggerConfigHelper.
                createDocket(config ->
                        config
                                .addTitle(INFO_TITLE)
                                .addDescription(INFO_DESCRIPTION)
                                .addVersion("1")
                                .addGroupName("REST Operations for business-availability")
                                .addBasePackage("<%= groupId %>.delivery.impl", PathSelectors.regex("/v1.*"))
                                .build());
    }

}
