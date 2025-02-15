Feature: Cadastro e Manutenção de Métodos de Pagamento (inserir, remover, atualizar) - Lucas Carvalho

    Scenario: Cadastro de cartão concluído com sucesso
        Given o usuário está na página de "Cadastro de cartão"
        When o usuário preenche o apelido "Cartão de painho", o nome "Wilson F Torres", o código "5380289055499691", o vencimento "2032/08" e o cvc "123"
        Then o cartão é salvo na conta com o apelido "Cartão de painho", o nome "Wilson F Torres", os quatro últimos dígitos "9691" e o tipo "MasterCard"
        And o usuário está na página de "Pagamento"

    Scenario: Remoção de cartão com sucesso
        Given o usuário está na página de "Pagamento"
        And o usuário tem os cartões de apelido "Cartão de painho" e "Cartão de mainha" cadastrados
        When o usuário seleciona a opção "Remover" o cartão "Cartão de painho"
        Then o usuário está na página de "Pagamento"
        And o cartão de apelido "Cartão de painho" é removido da lista de cartões
        And o usuário tem os cartões de apelido "Cartão de mainha" cadastrados

#    Scenario: Atualização de cartão com sucesso
#        Given o usuário está na página de "Atualização de cartão"
#        When o usuário seleciona a opção "Atualizar" o cartão "Cartão de painho"
#        And o usuário preenche o apelido "Cartão de pai", o nome "Wilson F Torres", o código "4556737586899855", o vencimento "03/30" e o cvc "123"
#        Then o cartão é salvo na conta com o apelido "Cartão de pai", o nome "Wilson F Torres", os quatro últimos dígitos "9855" e o tipo "VISA"
#        And o usuário está na página de "Atualização de cartão"

#    Scenario: algoritmo de validação dos cartões cadastrados
#        Given o usuário está na página de "Cadastro de cartão"
#        When o usuário preenche o apelido "Cartão de painho", o nome "Wilson F Torres", o código "5112345678998766", o vencimento "08/32" e o cvc "123"
#        And o usuário seleciona a opção "Cadastrar" com sucesso
#        Then o cartão é validado
#        And o cartão é salvo com a figura do tipo "MasterCard" ou "Visa"

#    Scenario: requisito não funcional de segurança de cadastro de cartão
#        Given o usuário está na página de "Cadastro de cartão"
#        When o usuário preenche o apelido "Cartão de painho", o nome "Wilson F Torres", o código "5112345678998766", o vencimento "08/32" e o cvc "123"
#        And o usuário seleciona a opção "Cadastrar" com sucesso
#        Then o número do cartão salvo está protegido como "************9855" por questões de segurança
#        And o usuário está na página de "Pagamento"