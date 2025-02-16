Feature: Coupons

Scenario: Create a Coupons
    Given "Coupons" não tem uma entrada "BrenoFriday"
    When uma requisição "POST" for enviada para "/coupons" com o body: "{ 'name': 'BrenoFriday', 'percentage' : 20}"
    Then "Coupons" agora tem uma entrada "BrenoFriday"
    And a entrada "BrenoFriday" de "Coupons" tem no body: "{ 'codename': 'BrenoFriday', 'percentage' : 20}"


Scenario: Get all Coupons
    Given "Coupons" tem uma entrada "BrenoFriday"
    And "Coupons" tem uma entrada "BrenoSaturday"
    When uma requisição "GET" for enviada para "/coupons" com o body: ""
    Then "Coupons" agora tem uma entrada "BrenoFriday"
    And "Coupons" agora tem uma entrada "BrenoSaturday"


Scenario: Delete Coupons
    Given "Coupons" tem uma entrada "BrenoFriday"
    When uma requisição "DELETE" for enviada para "/coupons/BrenoFriday" com o body: ""
    Then "Coupons" agora não tem uma entrada "BrenoFriday"

Scenario: Update Coupons
    Given "Coupons" tem uma entrada "BrenoFriday"
    When uma requisição "PUT" for enviada para "/coupons" com o body: "{ 'name': 'BrenoFriday', 'percentage' : 30}"
    Then "Coupons" agora tem uma entrada "BrenoFriday"
    And a entrada "BrenoFriday" de "Coupons" tem no body: "{ 'codename': 'BrenoFriday', 'percentage' : 30}"

