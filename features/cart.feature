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

Cenario: Finalizar a compra do carrinho de compras com sucesso
 Dado o usuário está na página de "Carrinho de Compras"
 E apenas os produtos "Álgebra Linear por J. L. Boldrini" com "20 unidades", "Computador Positivo" com "1 unidade", e "Teclado RGB Multilaser" com "1 unidade" estão dentro do carrinho 
 E o número de unidades em estoque para os produtos "Álgebra Linear por J. L. Boldrini", "Computador Positivo", e "Teclado RGB Multilaser" é maior que as do carrinho
 Quando o usuário seleciona a opção "Finalizar compra"
 E o usuário seleciona a opção de "Confirmar"
 Entao o usuário está na página de "Pagamento"
 Quando o usuário finalizar uma compra com o status "sucesso"
 Entao o pedido de ID "1234" contendo os produtos "Álgebra Linear por J. L. Boldrini" com "20 unidades", "Computador Positivo" com "1 unidade", e "Teclado RGB Multilaser" com "1 unidade" são adicionados à página de "Histórico de pedidos"
 E o usuário está na página de "Carrinho de Compras"
 E aparece uma mensagem indicando "seu carrinho está vazio"

Cenario: Finalizar a compra do carrinho de compras falha
 Dado o usuário está na página de "Carrinho de Compras"
 E apenas os produtos "Álgebra Linear por J. L. Boldrini" com "99 unidades", "Computador Positivo" com "1 unidade", e "Teclado RGB Multilaser" com "1 unidade" estão dentro do carrinho 
 E o número de unidades em estoque para o produto "Álgebra Linear por J. L. Boldrini" é menor do que as do carrinho
 Quando o usuário seleciona a opção "Finalizar compra"
 Entao  aparece uma mensagem indicando "não foi possível finalizar compra", juntamente com a justificativa "Álgebra Linear por J. L. Boldrini - 99 unidades ultrapassa a quantidade em estoque"
 E o usuário está na página de "Carrinho de Compras"
 