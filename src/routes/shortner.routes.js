import express from 'express';
import validate from '../middlewares/validate.js';
import urlValidation from '../validations/url.validation.js';
import { UrlController } from '../controllers/index.js';

const router = express.Router();

router.post(
    '/shorten', 
    validate(urlValidation.shortenUrl), 
    UrlController.shortenUrl
    
);
router.get(
    '/:shortCode', 
    validate(urlValidation.resolveUrl), 
    UrlController.resolveShortUrl
);

export default router;
