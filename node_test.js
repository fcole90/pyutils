const py = require("./dist/pyutils.node");
console.log("Module content:");
console.log(py);
py.print("Node test passed!");

for (const i of py.range(5)) {
    py.print(i);
}