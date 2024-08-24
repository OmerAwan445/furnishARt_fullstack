import { getFurnitureItem3DModelFromID, getFurnitureItemImageFromID } from '@src/controllers/FurnitureItemsAssets';
import { Router } from 'express';

const router = Router();

router.get("/3dmodel/:id", getFurnitureItem3DModelFromID);
router.get("/images/:productId/:fileName", getFurnitureItemImageFromID);

router.get('/', (req, res, next)=>{ 
  res.send('Hello World');
});

export const appRoutes = router;
