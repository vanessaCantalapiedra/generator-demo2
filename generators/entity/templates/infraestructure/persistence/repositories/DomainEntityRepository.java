package <%= groupId %>.persistence.repositories;

import java.util.Collection;
import java.util.Collections;
import <%= groupId %>.persistence.entities.<%= entityClassName %>Entity;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class <%= entityClassName %>Repository {

  

    public Collection<<%= entityClassName %>Entity> findAll() {
    	//TODO to be implemented
        return Collections.emptyList();
    }

}
