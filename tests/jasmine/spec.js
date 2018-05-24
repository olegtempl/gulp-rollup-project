// for basic functions tests
const   path = '../../build/js/',		// путь до файла
		testFile = require(`${path}index`);	// импортируем модуль
// for cli tests
const fileCli = '';
const apiCli = {
  v : '-v'
};
/*
  Basic functions tests
*/
describe("Jasmine", function() {
  it("makes testing JavaScript awesome!", function() {
    const count = testFile(1);				// экземпляр модуля для этого теста
    expect(count).toBe(2); 				    // сам тест
  });
});
/*
  Command-line interface tests ( add rights the performing file - ex: chmod 755 index.js)
*/
const { spawn } = require('child_process');
function runCmd(cmd, args, callBack) {
  const child = spawn(cmd, args);

  let resp = "";
  child.stdout.on('data', function (buffer) { resp += buffer.toString() });
  child.stdout.on('end', function() { callBack (resp) });
  child.stdout.on('error', callBack);
};
describe("Command-line interface tests", function() {
  it("Call the file with flag ''", function() {
    runCmd(fileCli , [apiCli.v], function(err, text) {
      if (err) return console.error(err);
      console.log(text)
     });
  });
  it("Call the file with flag ''", function() {
    runCmd(fileCli , [apiCli.], function(err, text) {
      if (err) return console.error(err);
      console.log(text)
     });
  });
  it("Call the file with flag ''", function() {
    runCmd(fileCli , [apiCli.], function(err, text) {
      if (err) return console.error(err);
      console.log(text)
     });
  });
});
