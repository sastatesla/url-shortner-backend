// services/UrlService.js
import prisma from '../utils/db.js';
import ApiError from '../utils/ApiError.js';
import { generateShortCode } from '../helpers/url.helper.js';

class UrlService {
	constructor() {
		this.createShortUrl = this.createShortUrl.bind(this);
		this.getOriginalUrl = this.getOriginalUrl.bind(this);
	}

	async createShortUrl(originalUrl) {
		try {
			let shortCode = generateShortCode();

			let exists = await prisma.url.findUnique({ where: { shortCode } });
			while (exists) {
				shortCode = generateShortCode();
				exists = await prisma.url.findUnique({ where: { shortCode } });
			}

			const newUrl = await prisma.url.create({
				data: {
					originalUrl,
					shortCode,
				},
			});

			return newUrl;
		} catch (err) {
			throw ApiError.InternalServerError('Failed to create short URL', 'SHORT_URL_ERROR',err);
		}
	}

	async getOriginalUrl(shortCode) {
		try {
			const url = await prisma.url.findUnique({
				where: { shortCode },
			});

			if (!url) {
				throw ApiError.NotFound('Short URL not found');
			}

			await prisma.url.update({
				where: { shortCode },
				data: { clicks: { increment: 1 } },
			});

			return url.originalUrl;
		} catch (err) {
			throw err;
		}
	}
}

export default new UrlService();
