Feature: Payment Flow

  Scenario: Navigate to payment methods page successfully
    Given o usuário está na página de "Pagamento"
    When o usuário seleciona a opção "Adicionar novo cartão"
    Then o usuário está na página de "Cadastro de cartão"

  Scenario: Successfully register a new card
    Given o usuário está na página de "Cadastro de cartão"
    When o usuário preenche o apelido "Cartão de teste de painho", a transação "Crédito", o nome "Wilson F Torres", o código "5356614114927905", o vencimento "08/32" e o cvc "123"
    Then o cartão é salvo na conta com o apelido "Cartão de painho", a transação "Crédito", o nome "Wilson F Torres", o código "5356614114927905", o vencimento "08/32", o cvc "123" e o tipo "MasterCard"
    And o usuário está para página de "Pagamento"
