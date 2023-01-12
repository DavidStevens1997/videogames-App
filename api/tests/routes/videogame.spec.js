/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200));
    
    //-----------------------------------------------------------------------

    it('should get 200 if the videogame exists - by name', () =>
      agent.get('/videogames?name=Tetris').expect(200));
    it('should get 200 if the videogame exists - by ID', () =>
      agent.get('/videogame/52623').expect(200));
    it('should get 404 if the videogame does not exist', () =>
      agent.get('/videogame/testTest!').expect(404));
  });
});
