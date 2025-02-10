Feature: Histórico de Pedidos
  Como um usuário do sistema
  Quero acessar e interagir com o histórico de pedidos
  Para visualizar informações e realizar ações relacionadas a pedidos realizados

  Scenario: Acessar Histórico de Pedidos
  Given o usuário está na página "Menu Principal"
  When clica no botão "Histórico de Pedidos"
  Then o sistema redireciona o usuário para a página "Histórico de Pedidos"
  And exibe os 3 pedidos mais recentes com os seguintes detalhes:
    | order_id | created_at                | order_data | destination   | status    | total_value |
    | 1        | 2025-02-09T18:41:15+00:00 | 2023-10-01 | Rua A, 123    | delivered | 550         |
    | 2        | 2025-02-09T18:45:48.99775+00:00 | 2023-09-25 | Rua B, 456    | shipped   | 200         |
    | 3        | 2025-02-09T18:46:27.623864+00:00 | 2023-09-20 | Rua C, 789    | pending   | 150         |

  Scenario: Visualizar itens comprados em um pedido
  Given o usuário está na página "Histórico de Pedidos"
  When clica no pedido com ID "pedido1"
  Then o sistema exibe os itens do pedido com os seguintes detalhes:
    | id | created_at                | order_id | product_id                  | price_paid | amount |
    | 1  | 2025-02-09T18:43:41.634825+00:00 | 1        | ae5abaa3-fd1b-4f74-85bd-45fbcebeb3db | 500       | 1      |
    | 2  | 2025-02-09T18:54:58.26036+00:00  | 1        | a52f3649-aad8-4338-a263-f3393ecc1a93 | 50        | 1      |
  And o usuário permanece na página "Histórico de Pedidos"

  Scenario: Exibir todos os pedidos realizados
  Given o usuário está na página "Histórico de Pedidos"
  When clica no botão "Ver Todos os Pedidos"
  Then o sistema exibe todos os pedidos realizados pelo usuário
  And exibe o total de pedidos como "5"
  And exibe os pedidos com os seguintes detalhes:
    | order_id | created_at                | order_data | destination   | status    | total_value |
    | 1        | 2025-02-09T18:41:15+00:00 | 2023-10-01 | Rua A, 123    | delivered | 550         |
    | 2        | 2025-02-09T18:45:48.99775+00:00 | 2023-09-25 | Rua B, 456    | shipped   | 200         |
    | 3        | 2025-02-09T18:46:27.623864+00:00 | 2023-09-20 | Rua C, 789    | pending   | 150         |
    | 4        | 2025-02-09T18:49:36.882636+00:00 | 2023-09-15 | Rua D, 101    | canceled  | 300         |
    | 5        | 2025-02-09T18:53:10.346646+00:00 | 2023-09-10 | Rua E, 202    | delivered | 100         |
  And o usuário permanece na página "Histórico de Pedidos"

  Scenario: Filtrar pedidos por data no histórico
  Given o usuário está na página "Histórico de Pedidos"
  When seleciona o filtro de data "2023-09-25"
  Then o sistema exibe apenas os pedidos realizados na data "2023-09-25" com os seguintes detalhes:
    | order_id | order_data | destination   | status    | total_value |
    | 2        | 2023-09-25 | Rua B, 456    | shipped   | 200         |
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