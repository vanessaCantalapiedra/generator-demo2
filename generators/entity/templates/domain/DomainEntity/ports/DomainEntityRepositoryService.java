package <%= groupId %>.<%= entityPackage %>.ports;

import java.util.Collection;

import <%= groupId %>.<%= entityPackage %>.<%= entityClassName %>;

public interface <%= entityClassName %>RepositoryService {

  Collection<<%= entityClassName %>> getAll<%= entityClassName %>();

}
