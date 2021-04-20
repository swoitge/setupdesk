const {spawnSync}    = require('child_process');
const {spawn}        = require('child_process');
const fs             = require('fs');
const readline       = require("readline");
const CFG_FILE       = "projects.json";

// read the config from working directory
if(!fs.existsSync(CFG_FILE)) {
  console.log("config file does not exist");
  return;
}

// read config
var config = JSON.parse(fs.readFileSync(CFG_FILE));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PASS_Question = "SVN Password? ";

console.log("Confiǵured projects:");
console.log("(A) All projects");
for(var idx in config.projects) {
  var displayIdx = parseInt(idx) + 1;
  console.log("(" + displayIdx + ") " + config.projects[idx].name);
}

rl.question("(A)ll Projects or Number:", function(number) {
  rl.question("Type of Action (D)ump or (C)heckout? ", function(type) {

    // checkout projects
    if(type.toUpperCase() == "C") {
      rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if(stringToWrite == PASS_Question) {
          rl.output.write(PASS_Question);}
        else {
          rl.output.write("*");
        }
      };
      rl.question(PASS_Question, function(password) {
        if(number.toUpperCase() == "A") {
          checkoutAllProjects(password);
        }
        else {
          var project = config.projects[number-1];
          checkoutProject(password, project);
        }
        rl.close();
      });
    }

    // dump projects
    if(type.toUpperCase() == "D") {
      if(number.toUpperCase() == "A") {
        dumpAllProjects();
      }
      else {
        var project = config.projects[number-1];
        dumpProject(project);
      }
      rl.close();
    }
  });
});

function checkoutAllProjects(password) {
  // all projects
  for(var prj of config.projects) {
    checkoutProject(prj);
  }
}

function checkoutProject(password, prj) {
  console.log("checking out project", prj.name);

  var realm = config.realms[prj.realm];
  fs.mkdirSync(realm.base + "/" + prj.name, {recursive: true});
  var retval = spawnSync("svn", ["checkout","--username", realm.user,"--password", password, prj.svn, prj.name], {cwd:realm.base});
  console.log(retval.stdout.toString());
  console.error(retval.stderr.toString());
}

function dumpAllProjects() {
  // all projects
  for(var prj of config.projects) {
    dumpProject(prj);
  }
}

function dumpProject(prj) {
  console.log("dump project", prj.name);

  var realm = config.realms[prj.realm];
  fs.mkdirSync(realm.base, {recursive: true});

  //svnrdump dump https://helixteamhub.cloud/private38/projects/jenkins/repositories/subversion/jenkins > jenkins.dump
  var dump = spawn("svnrdump", ["dump", prj.svn], {cwd:realm.base});
  var fileOut = fs.createWriteStream(prj.name + ".dump");
  dump.stdout.pipe(fileOut);
  if(dump.error) console.log("error on svn dump", retval.error);
}
