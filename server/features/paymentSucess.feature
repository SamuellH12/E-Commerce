Feature: Cadastro e Manutenção de Métodos de Pagamento (inserir, remover, atualizar) - Lucas Carvalho

    Scenario: Cadastro de cartão concluído com sucesso
        Given o usuário está na página de "Cadastro de cartão"
        When o usuário preenche o apelido "Cartão de painho", a transação "Credit", o nome "Wilson F Torres", o código "5380289055499691", o vencimento "3000/08" e o cvc "123"
        Then o cartão é salvo na conta com o apelido "Cartão de painho", a transação "Credit", o nome "Wilson F Torres", os quatro últimos dígitos "9691" e o tipo "MasterCard"
        And o usuário está na página de "Pagamento"

    Scenario: Remoção de cartão com sucesso
        Given o usuário está na página de "Pagamento"
        And o usuário tem os cartões de apelido "Cartão de painho" e "Cartão de mainha" cadastrados
        When o usuário seleciona a opção "Remover" o cartão "Cartão de painho"
        Then o usuário está na página de "Pagamento"
        And o cartão de apelido "Cartão de painho" é removido da lista de cartões
        And o usuário tem os cartões de apelido "Cartão de mainha" cadastrados

    Scenario: Atualização de cartão com sucesso
        Given o usuário está na página de "Pagamento"
        And o usuário tem os cartões de apelido "Cartão de painho" cadastrados
        When o usuário seleciona a opção "Atualizar" o cartão "Cartão de painho"
        Then o usuário está na página de "Atualização de cartão"
        When o usuário preenche o apelido "Cartão de pai", a transação "Debit", o nome "Wilson F Torres", o código "4556737586899855", o vencimento "3000/03" e o cvc "123"
        Then o cartão é salvo na conta com o apelido "Cartão de pai", a transação "Debit", o nome "Wilson F Torres", os quatro últimos dígitos "9855" e o tipo "VISA"
        And o usuário está na página de "Pagamento"