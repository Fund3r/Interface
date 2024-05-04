// pages/api/defillama.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// 使用对象映射来定义API路由
const API_ROUTES = {
  protocols: 'https://api.llama.fi/protocols',
  historicalChainTvl: 'https://api.llama.fi/v2/historicalChainTvl',
  protocol: (protocol: string) => `https://api.llama.fi/protocol/${protocol}`
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, url } = req;
    let apiUrl = '';

    try {
        if (query.protocol && typeof query.protocol === 'string') {
        apiUrl = API_ROUTES.protocol(query.protocol);
        } else if (url?.includes("/historicalChainTvl")) {
        apiUrl = API_ROUTES.historicalChainTvl;
        } else {
        apiUrl = API_ROUTES.protocols;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
        throw new Error(`Error fetching DefiLlama data from ${apiUrl}: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Failed to fetch data from ${apiUrl}` });
    }
}