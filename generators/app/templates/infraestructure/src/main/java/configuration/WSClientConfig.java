package <%= groupId %>.configuration;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.myarch.webflux.rest.annotations.EnableWebClientSupport;


@Configuration
@EnableWebClientSupport
@EnableConfigurationProperties()
public class WSClientConfig {

}
