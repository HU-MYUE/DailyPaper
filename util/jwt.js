import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data;
  }

  // 生成token
  generateToken() {
    const { data } = this;
    const created = Math.floor(Date.now() / 1000);
    const cert = fs.readFileSync(
      path.join(__dirname, '../keyStore/private_key.pem')
    ); // 私钥 可以自己生成
    const token = jwt.sign(
      {
        data,
        exp: created + 60 * 30
      },
      cert,
      { algorithm: 'RS256' }
    );
    return token;
  }

  // 校验token
  verifyToken() {
    const token = this.data;
    const cert = fs.readFileSync(
      path.join(__dirname, '../keyStore/public_key.pem')
    ); // 公钥 可以自己生成
    let res;
    try {
      const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
      const { exp = 0 } = result;
      const current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = 'err';
    }
    return res;
  }
}

module.exports = Jwt;
