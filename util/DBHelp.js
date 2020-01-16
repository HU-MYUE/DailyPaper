/**
 * Des:连接mySql数据库
 * CreateBy：hangzt
 * Date:20200115
 */
import Mysqlconnect from 'mysql';

const connection = Mysqlconnect.createConnection({
  host: '115.238.251.115',
  user: 'user',
  password: 'password',
  database: 'app',
});
connection.connect();
export default connection;
