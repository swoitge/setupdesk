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
      if(number.toUpperCase() == "A") {
        checkoutAllProjects();
      }
      else {
        var project = config.projects[number-1];
        checkoutProject(project);
      }
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
    }
    rl.close();
  });
});

function checkoutAllProjects() {
  // all projects
  for(var prj of config.projects) {
    checkoutProject(prj);
  }
}

function checkoutProject(prj) {
  console.log("checout project", prj.name);

  var realm = config.realms[prj.realm];
  fs.mkdirSync(realm.base + "/" + prj.name, {recursive: true});
  var retval = spawnSync("svn", ["checkout","--username", realm.user, prj.svn, prj.name], {cwd:realm.base});
  if(retval.error) console.log("error on svn", retval.error);
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
