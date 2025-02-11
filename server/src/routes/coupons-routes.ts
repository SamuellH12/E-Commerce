import { Router } from "express";
import { addCoupon, readAllCoupons, deleteCoupon } from "../controllers/coupons/coupons-controllers";

const couponsRouter = Router();

couponsRouter.get("/", readAllCoupons);

couponsRouter.post("/", addCoupon);

couponsRouter.delete("/:couponID", deleteCoupon);
export { couponsRouter };