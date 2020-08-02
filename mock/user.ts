import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}

export default {
  'GET  /api/login/captcha': getFakeCaptcha,
}
