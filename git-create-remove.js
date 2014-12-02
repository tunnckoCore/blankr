
/**
 * Token: 1bcec3340f5e4e99bba21f603b7a02361c46d0ca
 * Module dependencies.
 */
require('autoinstall')

var program = require('commander')
var superagent = require('superagent')

var api = 'https://api.github.com'


program
  .version('0.0.1')
  .option('-t, --token <token>', 'Github auth token', '1bcec3340f5e4e99bba21f603b7a02361c46d0ca')
  .parse(process.argv);


/**
 * add orgOrUser/repoName
 */
program
  .command('add <orgOrUserAndRepo>')
  .description('Create github repository for user/org')
  .option('-d, --description <string>', 'Description for the repository', '[default description]')
  .option('-h, --homepage <website>', 'Homepage of the repository', 'https://github.com/')
  .action(function (orgOrUserAndRepo, options) {
    if (!program.token) {
      console.error('You must provide github token')
      return;
    }
    var repos = orgOrUserAndRepo.split('/');
    var userOrOrg = repos[0];
    var repo = repos[1];
    var data = {};

    data.name = repo
    data.description = options.description;
    data.homepage = options.homepage

    superagent
      .get(api + '/users/' + userOrOrg)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end(function(err, result){
        errorHandler(result)
        var endpoint = '';
        
        if (result.body.type == 'User') {
          endpoint = '/user/repos'
        } else {
          endpoint = '/orgs/'+userOrOrg+'/repos'
        }

        superagent
          .post(api + endpoint)
          .send(data)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', 'token ' + program.token)
          .set('Content-Length', JSON.stringify(data).length)
          .end(function(err, res){
            errorHandler(res)

            console.log('Created `'+result.body.type+'` repository successfully.')
            console.log(JSON.stringify(data, null, 2))
            console.log('Visit: https://github.com/%s', orgOrUserAndRepo)
          });
      });
  });


/**
 * remove orgOrUser/repoName
 */
program
  .command('remove <repo>')
  .description('Remove github repository')
  .action(function(repo) {
    if (!program.token) {
      console.error('You must provide github token')
      return;
    }
    superagent
      .del(api + '/repos/'+repo)
      .set('Authorization', 'token ' + program.token)
      .end(function(err, res){
        errorHandler(res);
        console.log('Deleted successfully `https://github.com/%s` repository.', repo)
      });
  });


program.parse(process.argv);


function errorHandler(res) {
  if (!!res.error) {
    console.error(res.error);
    return;
  }
}
