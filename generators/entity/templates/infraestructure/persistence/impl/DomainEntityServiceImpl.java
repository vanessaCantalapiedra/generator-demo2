package <%= groupId %>.persistence.impl;

import java.util.Collection;
import java.util.stream.Collectors;

import <%= groupId %>.persistence.repositories.<%= entityClassName %>Repository;
import <%= groupId %>.persistence.converters.<%= entityClassName %>RepositoryConverter;
import <%= groupId %>.<%= entityPackage %>.ports.<%= entityClassName %>RepositoryService;
import <%= groupId %>.<%= entityPackage %>.<%= entityClassName %>;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class <%= entityClassName %>ServiceImpl implements <%= entityClassName %>RepositoryService {

    private final <%= entityClassName %>Repository <%= entityVarName %>Repository;  

    private final <%= entityClassName %>RepositoryConverter <%= entityVarName %>RepositoryConverter;

    @Override
    public Collection<<%= entityClassName %>> getAll<%= entityClassName %>() {
        return <%= entityVarName %>Repository.findAll().stream().map(<%= entityVarName %> -> <%= entityVarName %>RepositoryConverter.mapToEntity(<%= entityVarName %>))
				.collect(Collectors.toList());
    }

}
