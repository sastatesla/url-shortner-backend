import { ApiResponse } from '../utils/ApiResponse.js';
import UrlService from '../services/url.service.js';

class UrlController {
	constructor() {
		this.shortenUrl = this.shortenUrl.bind(this);
		this.resolveShortUrl = this.resolveShortUrl.bind(this);
	}

	async shortenUrl(req, res, next) {
		const apiResponse = new ApiResponse(res);

		try {
			const { url } = req.body;

			const newUrl = await UrlService.createShortUrl(url);

			return apiResponse.successResponse({
				message: 'Short URL created successfully',
				data: {
					shortUrl: `${process.env.BASE_URL}/url/${newUrl.shortCode}`,
					shortCode: newUrl.shortCode,
					originalUrl: newUrl.originalUrl,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async resolveShortUrl(req, res, next) {
		const apiResponse = new ApiResponse(res);

		try {
			const { shortCode } = req.params;

			const originalUrl = await UrlService.getOriginalUrl(shortCode);

		return res.redirect(originalUrl);

		} catch (error) {
			next(error);
		}
	}
}

export default new UrlController();
