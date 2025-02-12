Feature: Coupons

# Scenario: Create a Coupons
#     Given "Coupons" não tem uma entrada "BrenoFriday"
#     When uma requisição "POST" for enviada para "/coupons" com o body:
#         """
#         {
#             "name": "BrenoFriday",
#             "discount": 20
#         }
#         """
#     Then o sistema deve retornar o status code "201"
#     And o sistema deve retornar o body:
#         """
#         {
#             "name": "BrenoFriday",
#             "discount": 20
#         }
#         """



Scenario: Get all Coupons
    Given "Coupons" tem uma entrada "BrenoFriday"
    And "Coupons" tem uma entrada "BrenoSaturday"
    And "Coupons" tem exatamente 2 entradas
    When uma requisição "GET" for enviada para "/coupons"
    Then o sistema deve retornar o status code "200"
    And o sistema deve retornar o body:
        """
        [
            {
                "name": "BrenoFriday",
                "discount": 20
            },
            {
                "name": "BrenoSaturday",
                "discount": 20
            }
        ]
        """



# Scenario: Delete Coupons
#     Given "Coupons" tem uma entrada "BrenoFriday"
#     And a entrada "BrenoFriday" tem o body:
#         """
#         {
#             "name": "BrenoFriday",
#             "discount": 20
#         }
#         """
#     When uma requisição "DELETE" for enviada para "/coupons/BrenoFriday"
#     Then o sistema deve retornar o status code "200"



# Scenario: Update Coupons
#     Given "Coupons" tem uma entrada "BrenoFriday"
#     When uma requisição "PUT" for enviada para "/coupons/BrenoFriday" com o body:
#         """
#         {
#             "name": "BrenoFriday",
#             "discount": 30
#         }
#         """
#     Then o sistema deve retornar o status code "200"
#     And o sistema deve retornar o body:
#         """
#         {
#             "name": "BrenoFriday",
#             "discount": 30
#         }
#         """


