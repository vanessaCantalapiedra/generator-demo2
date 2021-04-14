package <%= groupId %>.persistence.converters;


import <%= groupId %>.persistence.entities.<%= entityClassName %>Entity;
import <%= groupId %>.<%= entityPackage %>.<%= entityClassName %>;


public class <%= entityClassName %>RepositoryConverter implements RepositoryConverter<<%= entityClassName %>Entity, <%= entityClassName %>> {

	
	@Override
	public <%= entityClassName %> mapToEntity(final <%= entityClassName %>Entity entityObject) {
		return new <%= entityClassName %>();
	}
}
