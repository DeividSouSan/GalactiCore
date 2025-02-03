const { exec } = require("node:child_process");
require("dotenv").config({ path: ".env" });

const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_ROOT_PASSWORD;

function waitForMysql() {
    exec(`docker exec mysql-dev mysql --user=${user} --password=${password} -e 'status'`, (err) => {
        if (err) {
            waitForMysql();
            process.stdout.write(".");
            return
        }
        console.log("\n🟢 - MySQL está ACEITANDO conexões.")
    })
}

console.log("🟡 - AGUARDANDO MySQL aceitar conexões.");
waitForMysql();

