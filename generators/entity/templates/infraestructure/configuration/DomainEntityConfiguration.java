package <%= groupId %>.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import <%= groupId %>.<%= entityPackage %>.usecase.GetAll<%= entityClassName %>UseCaseImpl;
import <%= groupId %>.delivery.converters.<%= entityClassName %>RestConverter;
import <%= groupId %>.persistence.converters.<%= entityClassName %>RepositoryConverter;
import <%= groupId %>.persistence.impl.<%= entityClassName %>ServiceImpl;
import <%= groupId %>.persistence.repositories.<%= entityClassName %>Repository;


@Configuration
public class <%= entityClassName %>Configuration {


    @Bean
    public <%= entityClassName %>Repository create<%= entityClassName %>Repository() {
        return new <%= entityClassName %>Repository();
    }

    @Bean
    public <%= entityClassName %>RepositoryConverter create<%= entityClassName %>RepositoryConverter() {
        return new <%= entityClassName %>RepositoryConverter();
    }

    @Bean
    public <%= entityClassName %>RestConverter create<%= entityClassName %>RestConverter() {
        return new <%= entityClassName %>RestConverter();
    }

    @Bean
    public <%= entityClassName %>ServiceImpl create<%= entityClassName %>ServiceImpl() {
        return new <%= entityClassName %>ServiceImpl(create<%= entityClassName %>Repository(), create<%= entityClassName %>RepositoryConverter());
    }

    @Bean
    public GetAll<%= entityClassName %>UseCaseImpl createGetAll<%= entityClassName %>UseCase() {
        return new GetAll<%= entityClassName %>UseCaseImpl(create<%= entityClassName %>ServiceImpl());
    }

   
}

