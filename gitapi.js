var request = require("request");

var reposOpts = {
  method: 'GET',
  url: 'https://api.github.com/users/tunnckoCore/repos?page=1',
  headers: {
    'Authorization': 'token adabf55ac486cd1af0c00fa209186a59d9da7130',
    'User-Agent': 'tunnckoCore-App'
  }
};

/**
 * DELETING TONS OF REPOS FAST!
 * @param  {[type]} error    [description]
 * @param  {[type]} response [description]
 * @param  {[type]} body     [description]
 * @return {[type]}          [description]
 */
request(reposOpts, function (error, response, body) {
  var res = JSON.parse(response.body);
  res.forEach(function (repo) {
    if (repo.name.indexOf('___') !== -1) {
      console.log(repo.name, 'stays')
    } else {
      request({
        method: 'DELETE',
        url: repo.url,
        headers: {
          'Authorization': 'token adabf55ac486cd1af0c00fa209186a59d9da7130',
          'User-Agent': 'tunnckoCore-App'
        }
      }, function (error2, response2, body2) {
        
        console.log('done')
      });
    }
  })
});

/**
 * RENAMING FAST!
 *
var request = require("request");

var reposOpts = {
  method: 'GET',
  url: 'https://api.github.com/users/tunnckoCore/repos?page=1',
  headers: {
    'Authorization': 'token adabf55ac486cd1af0c00fa209186a59d9da7130',
    'User-Agent': 'tunnckoCore-App'
  }
};

request(reposOpts, function (error, response, body) {
  var res = JSON.parse(response.body);
  res.forEach(function (repo) {
    if (repo.name.indexOf('___') !== -1) {
      console.log(repo.name, '-->')
      request({
        json: true,
        method: 'PATCH',
        url: repo.url,
        headers: {
          'Authorization': 'token adabf55ac486cd1af0c00fa209186a59d9da7130',
          'User-Agent': 'tunnckoCore-App'
        },
        body: {
          name: repo.name.substring(3, repo.name.length)
        }
      }, function (error2, response2, body2) {
        var res2 = JSON.parse(response2.body);
        res2.forEach(function (repo2) {
          console.log('<--', repo2.name)
        });
      });
    } else {
      
    }
  })
});
 */