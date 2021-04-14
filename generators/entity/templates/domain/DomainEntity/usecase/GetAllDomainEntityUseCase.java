package <%= groupId %>.<%= entityPackage %>.usecase;


import java.util.Collection;

import <%= groupId %>.<%= entityPackage %>.<%= entityClassName %>;


public interface GetAll<%= entityClassName %>UseCase {

  Collection<<%= entityClassName %>> execute();

}
