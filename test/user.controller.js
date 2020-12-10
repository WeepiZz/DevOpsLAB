const { expect } = require('chai')
const userController = require('../src/controllers/user')

let client

describe('User', () => {

  before(() => {
    client = require('../src/dbClient')
  })
    
  beforeEach(() => {
     client.flushall()
  })
    
  describe('Create', () => {

    
    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

     it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
     })
  })

   describe('Get', ()=> {
     // TODO Create test for the get method
     it('get a user by username', (done) => {
       // 1. First, create a user to make this unit test independent from the others
       const user = {
        username: 'WeepiZz',
        firstname: 'Adrien',
        lastname: 'Zychowski'
      }

      userController.create(user, (error, res) => {
        // 2. Then, check if the result of the get method is correct
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.eql(user)
          done()
        })
      })
       
     })

     it('get a user that does not exist', (done) => {
      // 1. First, create a user to make this unit test independent from the others
      const user = {
       username: 'WeepiZz',
       firstname: 'Adrien',
       lastname: 'Zychowski'
     }
      // 2. Then, check if the result of the get method is correct
      userController.get(user.username, (err, result) => {
        expect(err).not.to.be.equal(null)
        expect(result).not.to.be.equal('OK')
       done()
     })
    })

  })
})
