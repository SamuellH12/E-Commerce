Feature: Cadastro e Manutenção de cupons de desconto
    Como um administrador do sistema eu quero poder adicionar e manter cupons de
    desconto para os usuários.

  Scenario: Cupom adicionado com sucesso
    Given o usuário “Breno” com e-mail “breninho@gmail.com” está logado no sistema com acesso de administrador.
    And o usuário está na página “Cupons de desconto”
    And o cupom "BrenoFriday" não está cadatrado.
    When o usuário cadastrar o cupom “BrenoFriday” com a opção de “20%” de desconto com data de expiração para “16 de dezembro de 2024”.
    Then o cupom “BrenoFriday” está ativo para todos os usuários, concedendo “20%” de desconto na hora da compra até o dia “16 de dezembro de 2024”.

  Scenario: Remoção de cupom de desconto
    Given o usuário “Breno” com e-mail “breninho@gmail.com” está logado no sistema com acesso de administrador.
    And o usuário está na página “Cupons de desconto”
    And o usuário vê o cupom de desconto “BrenoFriday”
    When o usuário escolher deletar o cupom de desconto “BrenoDriday”
    Then o cupom “BrenoFriday” não estará mais ativo e deixará de funcionar.