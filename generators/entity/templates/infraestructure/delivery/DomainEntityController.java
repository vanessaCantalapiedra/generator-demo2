package <%= groupId %>.delivery;

import java.util.Collection;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;
import <%= groupId %>.exceptions.InfraestructureBaseException;
import <%= groupId %>.delivery.rest.<%= entityClassName %>Rest;


public interface <%= entityClassName %>Controller {

    Mono<ResponseEntity<Collection<<%= entityClassName %>Rest>>> getAll<%= entityClassName %>() throws InfraestructureBaseException;

}
