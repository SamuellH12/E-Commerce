import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import newCard, {
  validacaoDataCartao,
  validacaoTipoCartao,
} from "../../controllers/card/utils/new-card";

export const createCardRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/new_card",
    {
      schema: {
        body: z.object({
          nickname: z.string(),
          name: z.string().nonempty(),
          code: z.string().min(13).max(16),
          expiration: z.string().min(7).max(7),
          cvc: z.string().min(3).max(3),
        }),
      },
    },
    async (request, response) => {
      const card = request.body;

      // validate card
      let validation = validacaoTipoCartao(card.code);
      if (validation === "invalid") {
        response.status(400).send("Invalid card number");
        return;
      }
      const cardType = validation;

      validation = validacaoDataCartao(card.expiration);
      if (validation === "invalid") {
        response.status(400).send("Invalid expiration date");
        return;
      }

      // Create card
      response.send(newCard({ ...card, cardType: cardType }));
    }
  );
};
