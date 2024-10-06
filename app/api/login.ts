// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { loginShopify } from '../../lib/login';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const result = await loginShopify(email, password);

    if (result.success) {
      res.status(200).json({ success: true, token: result.token });
    } else {
      res.status(401).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
