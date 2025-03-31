Feature: Gerenciamento de Departamentos

  Background:
    Given estou na página de departamentos

  Scenario: Visualizar lista de departamentos
    Then devo ver os departamentos cadastrados

  Scenario: Criar departamento com sucesso
    When clico no botão para adicionar novo departamento
    And preencho o nome com "Eletrônicos"
    And confirmo a criação
    Then devo ver a mensagem "Departamento criado com sucesso"
    And o departamento "Eletrônicos" deve aparecer na lista

  Scenario: Tentar criar departamento com nome inválido
    When clico no botão para adicionar novo departamento
    And preencho o nome com "Esportes!*%"
    And confirmo a criação
    Then devo ver a mensagem de erro "Verifique se o nome inserido é válido"

  Scenario: Editar departamento existente
    Given existe um departamento chamado "Casa"
    When clico no departamento "Casa"
    And altero o nome para "Casa e Jardim"
    And confirmo a edição
    Then devo ver a mensagem "Departamento atualizada com sucesso"
    And o departamento "Casa e Jardim" deve aparecer na lista

Scenario: Editar departamento existente de volta
    Given existe um departamento chamado "Casa e Jardim"
    When clico no departamento "Casa e Jardim"
    And altero o nome para "Casa"
    And confirmo a edição
    Then devo ver a mensagem "Departamento atualizada com sucesso"
    And o departamento "Casa" deve aparecer na lista

  Scenario: Excluir departamento
    Given existe um departamento chamado "Eletrônicos"
    When clico no departamento "Eletrônicos"
    And clico para excluir
    And confirmo a exclusão
    Then devo ver a mensagem "Departamento excluido sucesso"
    And o departamento "Eletrônicos" não deve mais aparecer na lista