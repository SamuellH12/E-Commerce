Feature: Departments

Scenario: Cadastrar um departamento novo com sucesso
    Given o usuário "Breninho" com e-mail "breninho@gmail.com" está logado no sistema com acesso de "admin"
    And não existe o departamento "Eletrônicos"
    When o usuário tenta cadastrar o Departamento com nome "Eletrônicos"
    Then Uma mensagem de "sucesso" é enviada
    And o usuário consegue ver "Eletrônicos" na lista de departamentos

