Feature: Categorias

  Scenario: Cadastro de Categoria com sucesso
    Given o usuário está na página "admin/categories"
    When o usuário tenta cadastrar a Categoria com nome "Celulares"
    Then o sistema deve exibir a mensagem de sucessomente com “Notebooks”, “Sofas” e "Celulares"
