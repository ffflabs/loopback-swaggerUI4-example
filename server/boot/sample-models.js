// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function (app) {
  const User = app.models.user,
    Role = app.models.Role,
    RoleMapping = app.models.RoleMapping,
    Team = app.models.Team,
    debug = require('debug')('loopback:openapi3:sample_models');

  User.create(
    [
      {username: 'John', email: 'john@doe.com', password: 'opensesame'},
      {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
      {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'},
    ],
    function (err, users) {
      if (err) throw err;

      debug(
        'Created users:',
        users.map((u) => u.email)
      );

      // create project 1 and make john the owner
      users[0].projects.create(
        {
          name: 'project1',
          balance: 100,
        },
        function (err, project) {
          if (err) throw err;

          debug('Created project:', project);

          // add team members
          Team.create(
            [
              {ownerId: project.ownerId, memberId: users[0].id},
              {ownerId: project.ownerId, memberId: users[1].id},
            ],
            function (err, team) {
              if (err) throw err;

              debug('Created team:', team);
            }
          );
        }
      );

      //create project 2 and make jane the owner
      users[1].projects.create(
        {
          name: 'project2',
          balance: 100,
        },
        function (err, project) {
          if (err) throw err;

          console.log('Created project:', project);

          //add team members
          Team.create(
            {
              ownerId: project.ownerId,
              memberId: users[1].id,
            },
            function (err, team) {
              if (err) throw err;

              console.log('Created team:', team);
            }
          );
        }
      );

      //create the admin role
      Role.create(
        {
          name: 'admin',
        },
        function (err, role) {
          if (err) throw err;

          console.log('Created role:', role);

          //make bob an admin
          role.principals.create(
            {
              principalType: RoleMapping.USER,
              principalId: users[2].id,
            },
            function (err, principal) {
              if (err) throw err;

              console.log('Created principal:', principal);
            }
          );
        }
      );
    }
  );
};
