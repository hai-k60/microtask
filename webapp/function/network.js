const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');

//declate namespace
const namespace = 'org.microtask';

//in-memory card store for testing so cards are not persisted to the file system
const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore( { type: 'composer-wallet-inmemory' } );

//admin connection to the blockchain, used to deploy the business network
let adminConnection;

//this is the business network connectionProfilection the tests will use.
let businessNetworkConnection;

let businessNetworkName = 'microtask';
let factory;


/*
 * Import card for an identity
 * @param {String} cardName The card name to use for this identity
 * @param {Object} identity The identity details
 */
async function importCardForIdentity(cardName, identity) {

  //use admin connection
  adminConnection = new AdminConnection();
  businessNetworkName = 'microtask';

  //declare metadata
  const metadata = {
      userName: identity.userID,
      version: 1,
      enrollmentSecret: identity.userSecret,
      businessNetwork: businessNetworkName
  };

  //get connectionProfile from json, create Idcard
 const connectionProfile = require('./local_connection.json');
 const card = new IdCard(metadata, connectionProfile);

  //import card
  await adminConnection.importCard(cardName, card);
}


/*
* Reconnect using a different identity
* @param {String} cardName The identity to use
*/
async function useIdentity(cardName) {

  //disconnect existing connection
  await businessNetworkConnection.disconnect();

  //connect to network using cardName
  businessNetworkConnection = new BusinessNetworkConnection();
  await businessNetworkConnection.connect(cardName);
}

//export module
module.exports = {
    loginCard:async function(cardId){
      try{
        await useIdentity(cardName);
      }catch(err) {
        //print and return error
        console.log(err);
        var error = {};
        error.error = err.message;
        return error;
      }
    },

    registerWorker: async function(cardId,Id_worker, name, birthday, email, phone, address, skill){
        try {

            //connect as admin
            businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect('admin@microtask');
      
            //get the factory for the business network
            factory = businessNetworkConnection.getBusinessNetwork().getFactory();
      
            //create member participant
            const worker = factory.newResource(namespace, 'worker', Id_worker);
            worker.Id_worker=Id_worker;
            worker.name=name;
            worker.birthday=birthday;
            worker.email=email;
            worker.phone=phone;
            worker.address=address;
            worker.skill=skill;
            worker.coin=0;
            
      
            //add worker participant
            const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.worker');
            await participantRegistry.add(worker);
      
            //issue identity
            const identity = await businessNetworkConnection.issueIdentity(namespace + '.worker#' + Id_worker, cardId);
      
            //import card for identity
            await importCardForIdentity(cardId, identity);
      
            //disconnect
            await businessNetworkConnection.disconnect('admin@microtask');
      
            return true;
          }
          catch(err) {
            //print and return error
            console.log(err);
            var error = {};
            error.error = err.message;
            return error;
          }      
    },

    registerCompany: async function(cardId, Id_company,name, email, phone, address, ) {
      try {
  
        //connect as admin
        businessNetworkConnection = new BusinessNetworkConnection();
        await businessNetworkConnection.connect('admin@microtask');
  
        //get the factory for the business network
        factory = businessNetworkConnection.getBusinessNetwork().getFactory();
  
        //create khachhang participant
        const company = factory.newResource(namespace, 'company', Id_company);
        company.Id_company  = Id_company;
        company.name        = name;
        company.email       = email;
        company.phone       = phone;
        company.address     = address;
        company.coin        = 0;
        //add member participant
        const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.company');
        await participantRegistry.add(company);
  
        //issue identity
        const identity = await businessNetworkConnection.issueIdentity(namespace + '.company#' + Id_company, cardId);
  
        //import card for identity
        await importCardForIdentity(cardId, identity);
  
        //disconnect
        await businessNetworkConnection.disconnect('admin@microtask');
  
        return true;
      }
      catch(err) {
        //print and return error
        console.log(err);
        var error = {};
        error.error = err.message;
        return error;
      }
  
    },  

    allworker: async function(){
      //connect to network
      businessNetworkConnection=new BusinessNetworkConnection();
      await businessNetworkConnection.connect('admin@microtask');

      //query all khachhang
      const allworker= await businessNetworkConnection.query('selectAllWorker');

      //disconnect
      await businessNetworkConnection.disconnect('admin@microtask');

      return allworker;

    },
    allcompany: async function(){
      //connect to network
      businessNetworkConnection=new BusinessNetworkConnection();
      await businessNetworkConnection.connect('admin@microtask');

      //query all khachhang
      const allcompany= await businessNetworkConnection.query('selectAllCompany');

      //disconnect
      await businessNetworkConnection.disconnect('admin@microtask');

      return allcompany;

    }

}