Feature: Histórico de Pedidos
  Como um usuário do sistema
  Quero acessar e interagir com o histórico de pedidos
  Para visualizar informações e realizar ações relacionadas a pedidos realizados

  Scenario: Acessar Histórico de Pedidos
  Given o usuário está na página "Menu Principal"
  When clica no botão "Histórico de Pedidos"
  Then o sistema redireciona o usuário para a página "Histórico de Pedidos"
  And exibe os 3 pedidos mais recentes com os seguintes detalhes:
    | Nome do pedido         | Pedido ID | Data       | Valor Total | Local de envio     | Status do pedido |
    | Pedido de Eletrônicos  | pedido1   | 2023-10-01 | R$ 500,00   | Rua A, 123         | Entregue         |
    | Pedido de Roupas       | pedido2   | 2023-09-25 | R$ 200,00   | Rua B, 456         | Em trânsito      |
    | Pedido de Livros       | pedido3   | 2023-09-20 | R$ 150,00   | Rua C, 789         | Pendente         |

  Scenario: Visualizar itens comprados em um pedido
  Given o usuário está na página "Histórico de Pedidos"
  When clica no pedido com ID "pedido1"
  Then o sistema exibe os itens do pedido com os seguintes detalhes:
    | Nome do item   | Item ID | Quantidade | Valor Unitário | Valor Total | Local de envio     | Status do pedido |
    | Smartphone     | item1   | 1          | R$ 500,00      | R$ 500,00   | Rua A, 123         | Entregue         |
    | Capa Protetora | item2   | 1          | R$ 50,00       | R$ 50,00    | Rua A, 123         | Entregue         |
  And o usuário permanece na página "Histórico de Pedidos"

  Scenario: Exibir todos os pedidos realizados
  Given o usuário está na página "Histórico de Pedidos"
  When clica no botão "Ver Todos os Pedidos"
  Then o sistema exibe todos os pedidos realizados pelo usuário
  And exibe o total de pedidos como "5"
  And exibe os pedidos com os seguintes detalhes:
    | Nome do pedido         | Pedido ID | Data       | Valor Total | Local de envio     | Status do pedido |
    | Pedido de Eletrônicos  | pedido1   | 2023-10-01 | R$ 500,00   | Rua A, 123         | Entregue         |
    | Pedido de Roupas       | pedido2   | 2023-09-25 | R$ 200,00   | Rua B, 456         | Em trânsito      |
    | Pedido de Livros       | pedido3   | 2023-09-20 | R$ 150,00   | Rua C, 789         | Pendente         |
    | Pedido de Alimentos    | pedido4   | 2023-09-15 | R$ 300,00   | Rua D, 101         | Cancelado        |
    | Pedido de Brinquedos   | pedido5   | 2023-09-10 | R$ 100,00   | Rua E, 202         | Entregue         |
  And o usuário permanece na página "Histórico de Pedidos"

  Scenario: Filtrar pedidos por data no histórico
  Given o usuário está na página "Histórico de Pedidos"
  When seleciona o filtro de data "2023-09-25"
  Then o sistema exibe apenas os pedidos realizados na data "2023-09-25" com os seguintes detalhes:
    | Nome do pedido | Pedido ID | Data       | Valor Total | Local de envio | Status do pedido |
    | Pedido de Roupas | pedido2   | 2023-09-25 | R$ 200,00   | Rua B, 456     | Em trânsito      |
  And o usuário permanece na página "Histórico de Pedidos"

  Scenario: Exibir mensagem em caso de erro ao carregar pedidos
  Given o usuário está na página "Histórico de Pedidos"
  When ocorre um erro ao carregar os pedidos do usuário com ID "usuario123"
  Then o sistema exibe a mensagem "Erro ao carregar pedidos. Tente novamente mais tarde."
  And redireciona o usuário para a página "Menu Principal"

  Scenario: Exibir mensagem quando não houver pedidos no histórico
  Given o usuário está na página "Histórico de Pedidos"
  And não existem pedidos registrados para o usuário com ID "usuarioSemPedidos"
  When o sistema tenta carregar os pedidos
  Then o sistema exibe a mensagem "Você ainda não realizou nenhum pedido."
  And o usuário permanece na página "Histórico de Pedidos"