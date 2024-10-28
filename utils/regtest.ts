import axios from 'axios';

const regtestUrl = process.env.REGTEST_NODE_URL;
const rpcUser = process.env.REGTEST_NODE_USER || '';
const rpcPassword = process.env.REGTEST_NODE_PASSWORD || '';

const rpc = axios.create({
  baseURL: regtestUrl,
  auth: {
    username: rpcUser,
    password: rpcPassword,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function rpcCall(method: string, params: any[] = []) {
  const response = await rpc.post('', {
    jsonrpc: '1.0',
    id: 'curltest',
    method,
    params,
  });

  if (response.data.error) {
    throw new Error(response.data.error.message);
  }

  return response.data.result;
}
