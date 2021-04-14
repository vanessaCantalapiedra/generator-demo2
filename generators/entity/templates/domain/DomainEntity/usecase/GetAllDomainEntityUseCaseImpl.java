package <%= groupId %>.<%= entityPackage %>.usecase;


import java.util.Collection;
import <%= groupId %>.<%= entityPackage %>.<%= entityClassName %>;
import <%= groupId %>.<%= entityPackage %>.ports.<%= entityClassName %>RepositoryService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class GetAll<%= entityClassName %>UseCaseImpl implements GetAll<%= entityClassName %>UseCase{

  private final <%= entityClassName %>RepositoryService <%= entityVarName %>RepositoryService;


  @Override
  public Collection<<%= entityClassName %>> execute() {
    return <%= entityVarName %>RepositoryService.getAll<%= entityClassName %>();
  }

}
