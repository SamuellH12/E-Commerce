Feature: Gerenciamento de Categorias

  Background:
    Given estou na página de categorias

  Scenario: Criar categoria
    When clico para adicionar nova categoria
    And preencho o nome com "Smartphones"
    And seleciono o departamento "eletrônicos"
    And confirmo a criação
    Then devo ver a mensagem "Categoria criada com sucesso"
    And a categoria "Smartphones" deve aparecer associada a "eletrônicos"

  Scenario: Tentar criar categoria sem departamento
    When clico para adicionar nova categoria
    And preencho o nome com "Acessórios"
    But não seleciono um departamento
    And confirmo a criação
    Then devo ver a mensagem de erro "preencha todos os campos"

  Scenario: Editar categoria mudando o departamento
    Given existe a categoria "Smartphones"
    When clico na categoria "Smartphones"
    And seleciono o departamento "Casa"
    And confirmo a edição
    Then devo ver a mensagem "Categoria atualizada com sucesso"
    And a categoria "Smartphones" deve aparecer associada a "Casa"

  Scenario: Excluir categoria
    Given existe a categoria "Smartphones"
    When clico na categoria "Smartphones"
    And clico para excluir
    And confirmo a exclusão
    Then devo ver a mensagem "Categoria excluida sucesso!"
    And a categoria "Smartphones" não deve aparecer na lista  