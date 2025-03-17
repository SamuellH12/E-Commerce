Feature: Carrinho de Compras

Background:
    Given o produto de nome "Álgebra Linear por J. L. Boldrini", ID "239a30b8-a117-4997-a52e-bcfb258636ba" e com "2" unidades está no carrinho
    And o produto de nome "Redmi Note 13 5g", ID "ae5abaa3-fd1b-4f74-85bd-45fbcebeb3db" e com "2" unidades está no carrinho


Scenario: Adicionar produto novo ao carrinho
    When tenta-se adicionar o produto de ID "634b7172-7265-486d-980b-0bea1af57491" com "2" unidades ao carrinho
    And agora há no carrinho o produto de nome "Roteador AX1500 Wi-Fi 7", ID "634b7172-7265-486d-980b-0bea1af57491" e com "2" unidades 

Scenario: Alterar quantidade de um produto no carrinho
    When tenta-se alterar a quantidade de unidades do produto de ID "239a30b8-a117-4997-a52e-bcfb258636ba" para "3"
    Then agora há no carrinho o produto de nome "Álgebra Linear por J. L. Boldrini", ID "239a30b8-a117-4997-a52e-bcfb258636ba" e com "3" unidades

Scenario: Remover um produto do carrinho
    When tenta-se remover o produto de ID "239a30b8-a117-4997-a52e-bcfb258636ba"
    Then aparece uma mensagem indicando: "Product Álgebra Linear por J. L. Boldrini removed from shopping cart successfully"

Scenario: Limpar todos os produtos do carrinho
    When tenta-se limpar o carrinho
    Then aparece uma mensagem indicando: "Shopping cart emptied successfully"

# Scenario: Finalizar a compra do carrinho de compras com sucesso
#    And o produto de ID "239a30b8-a117-4997-a52e-bcfb258636ba" tem "10" unidade em estoque
#    And o produto de ID "ae5abaa3-fd1b-4f74-85bd-45fbcebeb3db" tem "10" unidade em estoque
#    When o usuário tenta finalizar a compra do carrinho de compras
#    Then um pedido contendo os produtos de ID "239a30b8-a117-4997-a52e-bcfb258636ba", e "ae5abaa3-fd1b-4f74-85bd-45fbcebeb3db", com "2" e "2" unidades respectivamente é adicionados à página de Histórico de pedidos
#    And aparece uma mensagem indicando: "Shopping cart successfully checked out. Shopping cart is now empty"

# Scenario: Finalizar a compra do carrinho de compras falha
#    And o número de unidades em estoque para os produtos de ID "239a30b8-a117-4997-a52e-bcfb258636ba", e "ae5abaa3-fd1b-4f74-85bd-45fbcebeb3db" é "1" e "1" respectivamente
#    When o usuário tenta finalizar a compra do carrinho de compras
#    Then aparece uma mensagem indicando: "Failed to complete checkout"
#    And agora há no carrinho o produto de nome "Álgebra Linear por J. L. Boldrini", ID "239a30b8-a117-4997-a52e-bcfb258636ba" e com "2" unidades
#    And agora há no carrinho o produto de nome "Redmi Note 13 5g", ID "ae5abaa3-fd1b-4f74-85bd-45fbcebeb3db" e com "2" unidades

