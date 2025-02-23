import { Given, Then, When, setWorldConstructor } from "@cucumber/cucumber";
import axios from "axios";
import { expect } from "chai";
import supabase from "../../src/supabase/supabase.ts"

let status_inicial;
let id_produto;
let id_pedido;
let response;

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

//1) Scenario: Cancelamento de pedido com sucesso # features\cancel.feature:3
         Given('associdados ao pedido há apenas o produto de ID {string} com {string} unidades', async function (product_id, unidades) {  
            id_produto = product_id
            const { error } = await supabase
                .from('product-order-history')
                .insert({"id":400, "order_id":id_pedido, "product_id":id_produto,"amount":+unidades})
                .single();
            if (error) return 'database_error';
         });


         Given('o produto associado ao pedido tem {string} unidade em estoque', async function (estoque_inicial) { 
            const { error } = await supabase 
                .from("products")
                .update({"stock_quantity": +estoque_inicial})
                .eq("id",id_produto)
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


//2) Scenario: Cancelamento de pedido com Falho # features\cancel.feature:11

         Then('aparece uma mensagem indicando: {string}', function (mensagem) {
            expect(response.data).to.include(mensagem);
         });