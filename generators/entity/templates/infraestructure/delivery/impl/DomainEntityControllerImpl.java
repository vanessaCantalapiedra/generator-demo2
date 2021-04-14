package <%= groupId %>.delivery.impl;

import java.util.Collection;
import java.util.stream.Collectors;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import <%= groupId %>.<%= entityPackage %>.usecase.GetAll<%= entityClassName %>UseCase;
import <%= groupId %>.delivery.<%= entityClassName %>Controller;
import <%= groupId %>.delivery.converters.<%= entityClassName %>RestConverter;
import <%= groupId %>.delivery.rest.<%= entityClassName %>Rest;
import <%= groupId %>.exceptions.InfraestructureBaseException;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class <%= entityClassName %>ControllerImpl implements <%= entityClassName %>Controller {

    private final GetAll<%= entityClassName %>UseCase getAll<%= entityClassName %>UseCase;  

    private final <%= entityClassName %>RestConverter <%= entityVarName %>RestConverter;

    @Override
    @ResponseStatus(HttpStatus.OK)
    public Mono<ResponseEntity<Collection<<%= entityClassName %>Rest>>> getAll<%= entityClassName %>() throws InfraestructureBaseException {
        return Mono.just(ResponseEntity.ok(
            getAll<%= entityClassName %>UseCase.execute().stream().map(<%= entityVarName %> -> <%= entityVarName %>RestConverter.mapToRest(<%= entityVarName %>))
                .collect(Collectors.toList())));
    }

}
