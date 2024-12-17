# Cadastro e Manutenção de Métodos de Pagamento (inserir, remover, atualizar) - Lucas Carvalho

Scenario 1: Navegar para página de métodos de pagamento com sucesso
Given o usuário está na página de “Pagamento”
When o usuário seleciona a opção "Adicionar novo cartão"
Then o usuário está na página de “Cadastro de cartão”

Scenario 2: Cadastro de cartão concluído com sucesso
Given o usuário está na página de "Cadastro de cartão"
When o usuário preenche o apelido “Cartão de painho”, o nome “Wilson F Torres”, o código “5112345678998766”, o vencimento “08/32” e o cvc “123”
Then o cartão é salvo na conta com o apelido “Cartão de painho”, o nome “Wilson F Torres”, o código “5112345678998766”, o vencimento “08/32”, o cvc “123” e o tipo “MasterCard”
And o usuário está para página de “Pagamento”

Scenario 3: Cadastro de cartão sem sucesso por nome incorreto
Given o usuário está na página de "Cadastro de cartão"
When seleciona a opção "Adicionar novo cartão"
And o usuário preenche o apelido “Cartão de painho”, o nome “abc”, o código “5112345678998766”, o vencimento “08/32” e o cvc “123”
Then o usuário está na página de "Cadastro de cartão"
And o sistema emite um alerta de “dados incorretos”

Scenario 4: Cadastro de cartão sem sucesso por código incorreto
Given o usuário está na página de "Cadastro de cartão"
When seleciona a opção "Adicionar novo cartão"
And o usuário preenche o apelido “Cartão de painho”, o nome “Wilson F Torres”, o código “623513”, o vencimento “08/32” e o cvc “123”
Then o usuário está na página de "Cadastro de cartão"
And o sistema emite um alerta de “dados incorretos”

Scenario 5: Cadastro de cartão sem sucesso por vencimento incorreto
Given o usuário está na página de "Cadastro de cartão"
When seleciona a opção "Adicionar novo cartão"
And o usuário preenche o apelido “Cartão de painho”, o nome “abc”, o código “5112345678998766”, o vencimento “08/12” e o cvc “123”
Then o usuário está na página de "Cadastro de cartão"
And o sistema emite um alerta de “dados incorretos”

Scenario 6: Cadastro de cartão sem sucesso por cvc incorreto
Given o usuário está na página de "Cadastro de cartão"
When seleciona a opção "Adicionar novo cartão"
And o usuário preenche o apelido “Cartão de painho”, o nome “abc”, o código “5112345678998766”, o vencimento “08/32” e o cvc “00”
Then o usuário está na página de "Cadastro de cartão"
And o sistema emite um alerta de “dados incorretos”

Scenario 7: Remoção de cartão cadastrado com sucesso
Given o usuário está na página de “Pagamento”
And o usuário tem os cartões de apelido “cartão de painho” e “Cartão de mainha” cadastrados
When o usuário seleciona a opção “Remover” o cartão “Cartão de painho”
Then o usuário recebe uma questionamento de confirmação para remoção do cartão “Cartão de painho”
When o usuário confirma remoção do “Cartão de painho”
Then o usuário está na página de “Pagamento”
And o cartão de apelido “Cartão de painho” é removido da lista de cartões
And o usuário tem os cartões de apelido “Cartão de mainha” cadastrados

Scenario 8: Atualização de cartão cadastrado com sucesso
Given o usuário está na página de "Atualização de cartão"
When o usuário seleciona a opção “Atualizar” o cartão “Cartão de painho”
And o usuário preenche o apelido “Cartão de pai”, o nome “Wilson F Torres”, o código “4556737586899855”, o vencimento “03/30” e o cvc “123”
Then o cartão é salvo na conta com o apelido “Cartão de pai”, o nome “Wilson F Torres”, o código “4556737586899855”, o vencimento “03/30”, o cvc “123” e o tipo “VISA”
And o usuário está para página de “Atualização de cartão”

Scenario 9: Atualização de cartão cadastrado sem sucesso por código incorreto
Given o usuário está na página de "Atualização de cartão"
When o usuário seleciona a opção “Atualizar” o cartão “Cartão de painho”
And o usuário preenche o apelido “Cartão de pai”, o nome “Wilson F Torres”, o código “623513”, o vencimento “03/30” e o cvc “123”
Then o usuário está na página de "Atualização de cartão"
And o sistema emite um alerta de “dados incorretos”