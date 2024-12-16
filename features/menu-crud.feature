Feature: Cadastro e manutenção de itens no menu

    Scenario: Adicionar um novo item ao menu

    Given o usuário “Breninho” com e-mail “breninho@gmail.com” está logado no sistema com acesso de “administrador”
    And o usuário está na página de "Gerenciamento de Itens"
    When ele insere o nome "Redmi Note 13 pro", descrição "Celular de última geração", preço "2000.00", categoria "Celulares", disponibilidade "Disponível"
    And ele anexa uma imagem representativa em "img item"
    Then o sistema deve validar os dados inseridos
    And o item deve ser exibido na lista de itens cadastrados



