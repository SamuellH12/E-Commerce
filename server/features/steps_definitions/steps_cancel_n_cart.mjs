import { Given, Then, When, setWorldConstructor } from "@cucumber/cucumber";
import axios from "axios";
import { expect } from "chai";
import supabase from "../../src/supabase/supabase.ts"
import { exec } from "child_process";

let status_inicial;
let id_produto;
let id_pedido;
let body;
let response;

// Cancel Order
// Background
         Given('O histórico de pedidos tem um pedido de ID {string} com status {string}', async function (id, status) {
            id_pedido = +id;
            status_inicial = status;
            const { error } = await supabase
                .from('order-history')
                .insert({"order_id":id_pedido, "status":status_inicial})
                .single();
            if (error) return 'database_error';
         });

         Given('associdados ao pedido há apenas o produto de ID {string} com {string} unidades', async function (product_id, unidades) {  
            id_produto = product_id
            const { error } = await supabase
                .from('product-order-history')
                .insert({"id":400, "order_id":id_pedido, "product_id":id_produto,"amount":+unidades})
                .single();
            if (error) return 'database_error';
         });

// Definição do número em estoque
         Given('o produto de ID {string} tem {string} unidade em estoque', async function (id, estoque_inicial) { 
            const { error } = await supabase 
                .from("products")
                .update({"stock_quantity": +estoque_inicial})
                .eq("id",id)
                .single();
            if (error) return "database_error";
         });


         When("tenta se cancelar o pedido de ID {string}", async function (pedido_cancelado) {
            response = await axios.delete(`http://localhost:3000/cancel-order/${pedido_cancelado}`);
         });


         Then('No histórico de pedidos, o status atual do pedido é {string}', async function (status_esperado) {
            const { data: status_obtido, error: fetch_status } = await supabase 
                .from("order-history")
                .select("status")
                .eq("order_id",id_pedido)
                .single();
            if (fetch_status) return "database error";
            expect(status_obtido.status).to.equal(status_esperado)
            // Deleta o pedido e produto associado criados no given
            const { error: product_order_deletion_error } = await supabase 
                .from("product-order-history")
                .delete()
                .eq("id",400);
            if (product_order_deletion_error) return "database_error"
            const { error: order_deletion_error } = await supabase 
                .from("order-history")
                .delete()
                .eq("order_id",id_pedido);
            if (product_order_deletion_error) return "database_error"
         });


         Then('o produto associado ao pedido tem atualmente {string} unidade em estoque', async function (estoque_esperado) {
            const { data: estoque_final, error } = await supabase 
                .from("products")
                .select("stock_quantity")
                .eq("id",id_pedido)
                .single();
            if (error) return "database_error";
            expect(+estoque_esperado).to.eq(estoque_final.stock_quantity)
         });

//Mensagem indicando algo

         Then('aparece uma mensagem indicando: {string}', async function (mensagem) {
            expect(response.data).to.include(mensagem);
            if ((response.data).includes("removed from shopping cart successfully")){
              // Apaga todas as entradas para poder realizar o próximo cenário
              await axios.delete("http://localhost:3000/shopping-cart/");
            }
         });

// Cart
// Background
         Given('o produto de nome {string}, ID {string} e com {string} unidades está no carrinho', async function (nome, id, amount) {
          body = {"id":id, "amount":+amount}; 
          response = await axios.post("http://localhost:3000/shopping-cart/add", body);
         });

         When('tenta-se adicionar o produto de ID {string} com {string} unidades ao carrinho', async function (id, amount) {
           body = {"id":id, "amount":+amount}; 
           response = await axios.post("http://localhost:3000/shopping-cart/add", body);
         });

// 2) Scenario: Alterar quantidade de um produto no carrinho # features\cart.feature:13


         When('tenta-se alterar a quantidade de unidades do produto de ID {string} para {string}', async function (id, amount) {
          body = {"id":id, "amount":+amount}; 
          response = await axios.put("http://localhost:3000/shopping-cart/", body);
         });


// 3) Scenario: Remover um produto do carrinho # features\cart.feature:17
         When('tenta-se remover o produto de ID {string}', async function (id) {
           response = await axios.delete(`http://localhost:3000/shopping-cart/${id}`)
           // Apaga todas as entradas para poder realizar o próximo cenário
           await axios.delete("http://localhost:3000/shopping-cart/");
         });

// 4) Scenario: Limpar todos os produtos do carrinho # features\cart.feature:21

         When('tenta-se limpar o carrinho', async function () {
          response = await axios.delete(`http://localhost:3000/shopping-cart/`)
         });

// 5 & 6) Scenario: Finalizar a compra do carrinho de compras

         When('o usuário tenta finalizar a compra do carrinho de compras', async function () {
           response = await axios.post("http://localhost:3000/shopping-cart/checkout")
         });

         Then('agora há no carrinho o produto de nome {string}, ID {string} e com {string} unidades', async function (nome, id_produto, amount) {
          response = await axios.get(`http://localhost:3000/shopping-cart/${id_produto}`);
          expect(response.data.amount).to.equal(+amount);
          expect(response.data.products.name).to.equal(nome);
          // Apaga todas as entradas para poder realizar o próximo cenário
          await axios.delete("http://localhost:3000/shopping-cart/");
         });
        



         


         




         

         