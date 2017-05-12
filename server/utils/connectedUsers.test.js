const expect = require('expect');
const {
  ConnectedUsers
} = require('./connectedUsers')

describe('ConnectedUsers', () => {

  let connectedUsers;
  beforeEach(() => {
    connectedUsers = new ConnectedUsers();
    connectedUsers.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Probe',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Stephen',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    const connectedUsers = new ConnectedUsers();
    const user = {
      id: '123',
      name: 'Stephen',
      room: 'The Wire Fans'
    };

    const resUser = connectedUsers.addUser(user.id, user.name, user.room);
    expect(connectedUsers.users).toEqual([user]);
  });

  it('should get a user with the correct id', () => {
    const userId = '2';
    const user = connectedUsers.getUser(userId);
    expect(user.id).toEqual(userId);
  });

  it('should not get a user with the wrong id', () => {
    const userId = '1234';
    const user = connectedUsers.getUser(userId);
    expect(user).toNotExist();
  });

  it('should remove a user', () => {
    const userId = '3';
    const removedUser = connectedUsers.removeUser(userId)

    expect(removedUser.id).toBe(userId);
    expect(connectedUsers).toNotInclude(removedUser);
  });

  it('should not remove a user', () => {
    const userId = '1234';
    const userLength = connectedUsers.users.length;
    const removedUser = connectedUsers.removeUser(userId)

    expect(removedUser).toNotExist();
    expect(connectedUsers.users.length).toBe(userLength);
  });

  it('should return names for Node Course', () => {
    const userList = connectedUsers.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Stephen']);
  });

  it('should return names for React Course', () => {
    const userList = connectedUsers.getUserList('React Course');

    expect(userList).toEqual(['Probe']);
  });
});