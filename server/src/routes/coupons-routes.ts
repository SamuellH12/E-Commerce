import { Router } from "express";
import { addCoupon, readAllCoupons, deleteCoupon, updateCoupons } from "../controllers/coupons/coupons-controllers";

const couponsRouter = Router();

couponsRouter.get("/", readAllCoupons);

couponsRouter.post("/", addCoupon);

couponsRouter.delete("/:couponID", deleteCoupon);

couponsRouter.put('/', updateCoupons);

export { couponsRouter };