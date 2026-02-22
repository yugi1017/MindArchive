const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mysqlVersion = '5.7.44';
const mysqlDir = 'C:\\mysql-5.7.44';
const downloadUrl = `https://downloads.mysql.com/archives/get/p/23/file/mysql-${mysqlVersion}-winx64.zip`;

console.log('=== MySQL 5.7 ZIP 安装脚本 ===\n');

console.log(`1. 检查 MySQL 目录是否存在...`);
if (!fs.existsSync(mysqlDir)) {
    console.log(`   目录不存在，需要下载 MySQL...`);
    console.log(`   下载地址: ${downloadUrl}`);
    console.log(`\n请手动下载 MySQL ${mysqlVersion} Windows ZIP 包:`);
    console.log(`   1. 打开浏览器访问: https://downloads.mysql.com/archives/get/p/23/file/mysql-${mysqlVersion}-winx64.zip`);
    console.log(`   2. 下载后，将文件保存到此目录`);
    console.log(`   3. 将文件重命名为 mysql-${mysqlVersion}-winx64.zip`);
    console.log(`   4. 运行此脚本进行安装\n`);
    
    const zipFile = path.join(process.cwd(), `mysql-${mysqlVersion}-winx64.zip`);
    
    if (fs.existsSync(zipFile)) {
        console.log(`   找到 ZIP 文件，准备解压...`);
        console.log(`   解压到 C:\\ 盘...`);
        
        try {
            console.log(`   执行解压命令 (使用 PowerShell)...`);
            execSync(`powershell -Command "Expand-Archive -Path '${zipFile}' -DestinationPath 'C:\\' -Force"`, { stdio: 'inherit' });
            
            const extractedDir = `C:\\mysql-${mysqlVersion}-winx64`;
            if (fs.existsSync(extractedDir)) {
                console.log(`   解压成功！`);
                console.log(`   重命名目录为 mysql-5.7.44...`);
                fs.renameSync(extractedDir, mysqlDir);
            }
        } catch (e) {
            console.log(`   解压出错: ${e.message}`);
        }
    } else {
        console.log(`   未找到 ZIP 文件`);
        console.log(`   请先下载 MySQL ${mysqlVersion} ZIP 包`);
        process.exit(1);
    }
} else {
    console.log(`   MySQL 目录已存在: ${mysqlDir}`);
}

console.log(`\n2. 创建 my.ini 配置文件...`);
const myIniContent = `[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=${mysqlDir.replace(/\\/g, '\\\\')}
# 设置mysql数据库的数据的存放目录
datadir=${mysqlDir.replace(/\\/g, '\\\\')}\\data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8mb4
`;

const myIniPath = path.join(mysqlDir, 'my.ini');
fs.writeFileSync(myIniPath, myIniContent);
console.log(`   已创建: ${myIniPath}`);

console.log(`\n3. 初始化 MySQL 数据目录...`);
const dataDir = path.join(mysqlDir, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

try {
    console.log(`   执行: mysqld --initialize-insecure`);
    execSync(`"${path.join(mysqlDir, 'bin', 'mysqld')}" --initialize-insecure`, { 
        cwd: mysqlDir,
        stdio: 'inherit' 
    });
    console.log(`   初始化完成！`);
} catch (e) {
    console.log(`   初始化可能已存在或出错: ${e.message}`);
}

console.log(`\n4. 安装 MySQL 服务...`);
try {
    console.log(`   执行: mysqld --install MySQL57`);
    execSync(`"${path.join(mysqlDir, 'bin', 'mysqld')}" --install MySQL57`, { 
        cwd: mysqlDir,
        stdio: 'inherit' 
    });
    console.log(`   服务安装成功！`);
} catch (e) {
    console.log(`   安装服务出错: ${e.message}`);
}

console.log(`\n5. 启动 MySQL 服务...`);
try {
    execSync(`net start MySQL57`, { stdio: 'inherit' });
    console.log(`   MySQL 服务已启动！`);
} catch (e) {
    console.log(`   启动服务出错: ${e.message}`);
}

console.log(`\n=== 安装完成 ===`);
console.log(`\nMySQL 安装目录: ${mysqlDir}`);
console.log(`配置文件: ${myIniPath}`);
console.log(`数据目录: ${dataDir}`);
console.log(`\n首次登录（无密码）:`);
console.log(`   mysql -u root -p`);
console.log(`   (直接回车登录)`);
console.log(`\n停止服务: net stop MySQL57`);
console.log(`启动服务: net start MySQL57`);
