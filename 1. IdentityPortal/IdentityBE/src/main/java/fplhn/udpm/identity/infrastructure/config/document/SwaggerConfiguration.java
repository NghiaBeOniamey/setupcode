package fplhn.udpm.identity.infrastructure.config.document;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .addSecurityItem(
                        new SecurityRequirement()
                                .addList("Bearer Authentication")
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        "Bearer Authentication",
                                        createAPIKeyScheme()
                                )
                )
                .info(
                        new Info()
                                .title("Connection API for Module Connector")
                                .version("1.0")
                                .contact(
                                        new Contact()
                                                .name("hiuhiu87")
                                                .email("minhhieu8723@gmail.com")
                                                .url("minhhieu8723@gmail.com")
                                )
                                .license(
                                        new License()
                                                .name("License of API")
                                )
                );
    }


    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");
    }

}