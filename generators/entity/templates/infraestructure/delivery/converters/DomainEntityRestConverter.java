package <%= groupId %>.delivery.converters;

import <%= groupId %>.<%= entityPackage %>.<%= entityClassName %>;
import <%= groupId %>.delivery.rest.<%= entityClassName %>Rest;

public class <%= entityClassName %>RestConverter implements RestConverter<<%= entityClassName %>Rest, <%= entityClassName %>> {

    @Override
    public <%= entityClassName %> mapToEntity(final <%= entityClassName %>Rest rest) {
	//TODO create mapper
        return new <%= entityClassName %>();
    }

    @Override
    public <%= entityClassName %>Rest mapToRest(final <%= entityClassName %> entity) {
    	//TODO create mapper
        return new <%= entityClassName %>Rest();
    }

}
