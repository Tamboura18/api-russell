const test = require("node:test"); 
const assert = require("node:assert/strict"); 
const fs = require("fs"); 
const path = require("path"); 
const { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");

test("les fichiers JavaScript sont syntaxiquement valides", () => { 
    const files = [];
const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
        if (name === "node_modules" || name === ".git") continue;

        const full = path.join(dir, name);

        if (fs.statSync(full).isDirectory()) {
            walk(full);
        } else if (name.endsWith(".js")) {
            files.push(full);
        }
    }
};

walk(root);

for (const file of files) {
    execFileSync(process.execPath, ["--check", file]);
}

assert.ok(files.length > 0);
});
test("les trois services principaux existent", () => { 
    assert.ok(fs.existsSync(path.join(root, "services", "catwayService.js"))); 
    assert.ok(fs.existsSync(path.join(root, "services", "reservationService.js"))); 
    assert.ok(fs.existsSync(path.join(root, "services", "userService.js"))); });