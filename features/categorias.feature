GUI Scenario: Preenchimento bem sucedido
Given o usuário “Samuell” está logado no sistema como “aluno”
and o usuário está na página “Autoavaliação” 
when o usuário seleciona “MPA” no item “1”
and o usuário seleciona “MANA” no item “2”
and o usuário seleciona “MA” no item “3”
and o usuário seleciona “Submit”
Then aparece uma mensagem de confirmação
and o usuário está na página “Autoavaliação” 
and o usuário pode ver “MPA” no item “1”
and o usuário pode ver “MANA” no item “2”
and o usuário pode ver “MA” no item “3”

GUI Scenario: Preenchimento mal sucedido
Given o usuário “Samuell” está logado no sistema como “aluno”
and o usuário está na página “Autoavaliação” 
when o usuário seleciona “MPA” no item “1”
and o usuário seleciona “MANA” no item “2”
and o usuário seleciona “Submit”
Then aparece uma mensagem de erro  
and o usuário está na página “Autoavaliação” 
