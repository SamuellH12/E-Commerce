Funcionalidade: Carrinho de Compras
 Como um Cliente
 Eu quero Poder adicionar produtos a um carrinho de compras
 De modo a Que eu possa finalizar a compra de multiplos produtos de uma vez
 
Cenario: Acesso ao carrinho de compras
 Dado o usuário "Lucas" está na página de "Menu"
 Quando o usuário seleciona a opção "acesso a carrinho de compras"
 Entao  o usuário está na página de "Carrinho de Compras"

Cenario: Adicionar um item novo ao carrinho de compras com sucesso
 Dado o usuário "Lucas" está na página do produto "Álgebra Linear por J. L. Boldrini"
 E o produto "Álgebra Linear por J. L. Boldrini" não está no carrinho
 Quando o usuário seleciona a opção "adicionar ao carrinho"
 E o usuário seleciona a opção "1 unidade"
 Entao o usuário está na página de "Carrinho de Compras"
 E o usuário consegue ver "Álgebra Linear por J. L. Boldrini" com "1 unidade" no carrinho