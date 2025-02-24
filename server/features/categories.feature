Feature: Categories

Scenario: Cadastrar uma categoria nova
    Given o usuário "Breninho" com e-mail "breninho@gmail.com" está logado no sistema com acesso de "admin"
    And o usuário está na página "Categorias"
    And não existe a categoria "Acessorios"
    When o usuário seleciona a opção "Adicionar Categoria"
    And o usuário tenta cadastrar a Categoria com nome "Acessorios" e o departamento "Eletrônicos"
    Then aparece uma mensagem de confirmação
    And o usuário consegue ver "Acessorios" na lista de categorias

