  /**
 * Customer accept proposal transaction
 * @param {org.acme.crmblockchain.acceptProposal} accept
 * @transaction
 */

async function AcceptProposal(accept) {

   const factory = getFactory();
   const ns = 'org.acme.crmblockchain';
   const assetRegistry = await getAssetRegistry(ns+'.proposal')
   
   var proposal = accept.Proposal;
   
   let b = await assetRegistry.get(accept.Proposal.getIdentifier());
   let ex3 = await assetRegistry.exists(accept.Proposal.getIdentifier());
   
   const customerRegistry = await getParticipantRegistry(accept.Customerid.getFullyQualifiedType());
   let cus = await customerRegistry.exists(accept.Customerid.getIdentifier());
   
   const DealRegistry = await getAssetRegistry(accept.Deal.getFullyQualifiedType());
   let deal = await DealRegistry.exists(accept.Deal.getIdentifier());
   
   if (cus == true && deal == true && ex3 == false) {
     throw new Error ("Proposer id not found. Please enter the correct id");
   } else if (cus == false && deal == true &&ex3 == true){
     throw new Error ("Customer id not found. Please enter the correct id");

   } else if (cus == true && deal == false &&ex3 == true){
    throw new Error ("No deal have started. Please enter the correct deal");

  
   } else if (cus == true &&  deal == true && ex3 == true){

   if (b.status === 'REJECTED' && b.Customerid.$identifier == accept.Customerid.$identifier && b.Deal.$identifier == accept.Deal.$identifier) {

    throw new Error ("The proposal has been rejected")
   } else if (b.status ===  'ACCEPTED' && b.Deal.$identifier == accept.Deal.$identifier && b.Customerid.$identifier == accept.Customerid.$identifier) {

    throw new Error ("The proposal has been accepted")
   }
    else if (b.Customerid.$identifier == accept.Customerid.$identifier && b.Deal.$identifier == accept.Deal.$identifier){
   
     proposal.status = 'ACCEPTED';
     await assetRegistry.update(proposal);

  

   }  else     {
   throw new Error ("Customer id and deal number does not match. Please enter the correct customer id or deal number")
   }
   } else {

    throw new Error ("Please enter the correct Proposal id and customer id and deal number")
   }
 


   const AcceptProposalEvent = factory.newEvent(ns, 'proposalaccepted');
   AcceptProposalEvent.pp = proposal;
   emit(AcceptProposalEvent);
   
}


/**
 * Customer reject proposal transaction
 * @param {org.acme.crmblockchain.rejectProposal} reject
 * @transaction
 */

async function RejectProposal(reject) {

  const factory = getFactory();
  const ns = 'org.acme.crmblockchain';
  const assetRegistry = await getAssetRegistry(ns+'.proposal')
  
  
  var proposal = reject.Proposal;
   
  let b = await assetRegistry.get(reject.Proposal.getIdentifier());
  let ex3 = await assetRegistry.exists(reject.Proposal.getIdentifier());
   
  const customerRegistry = await getParticipantRegistry(reject.Customerid.getFullyQualifiedType());
  let cus = await customerRegistry.exists(reject.Customerid.getIdentifier());
   
  const DealRegistry = await getAssetRegistry(reject.Deal.getFullyQualifiedType());
  let deal = await DealRegistry.exists(reject.Deal.getIdentifier());
  
  if (cus == true && deal == true && ex3 == false) {
    throw new Error ("Proposer id not found. Please enter the correct id");
  } else if (cus == false && deal == true &&ex3 == true){
    throw new Error ("Customer id not found. Please enter the correct id");

  } else if (cus == true && deal == false &&ex3 == true){
   throw new Error ("No deal have started. Please enter the correct deal");

  
  } else if (cus == true &&  deal == true && ex3 == true){

  if (b.status === 'REJECTED' && b.Customerid.$identifier == reject.Customerid.$identifier && b.Deal.$identifier == reject.Deal.$identifier) {

   throw new Error ("The proposal has been rejected")
  } else if (b.status ===  'ACCEPTED' && b.Deal.$identifier == reject.Deal.$identifier && b.Customerid.$identifier == reject.Customerid.$identifier) {

   throw new Error ("The proposal has been accepted")
  }
   else if (b.Customerid.$identifier == reject.Customerid.$identifier && b.Deal.$identifier == reject.Deal.$identifier){
   
    proposal.status = 'REJECTED';
    proposal.RejectReason = reject.RejectReason;
    await assetRegistry.update(proposal);

  

  }  else     {
  throw new Error ("Customer id does not match the deal. Please enter the correct customer id or deal")
  }
  } else {

   throw new Error ("Please enter the correct Proposal id, customer id and deal number")
  }

    const RejectProposalEvent = factory.newEvent(ns, 'proposalrejected');
    RejectProposalEvent.pp = proposal;
    emit(RejectProposalEvent);
  
  }
  

 /**
 * Customer accept contract transaction
 * @param {org.acme.crmblockchain.acceptContract} accept
 * @transaction
 */

async function AcceptContract(accept) {

  const factory = getFactory();
  const ns = 'org.acme.crmblockchain';
  const assetRegistry = await getAssetRegistry(ns+'.contract')
  
  
  var contract = accept.Contract;
  
  let b = await assetRegistry.get(accept.Contract.getIdentifier());
  let ex3 = await assetRegistry.exists(accept.Contract.getIdentifier());


  const customerRegistry = await getParticipantRegistry(accept.Customerid.getFullyQualifiedType());
  let cus = await customerRegistry.exists(accept.Customerid.getIdentifier());

  const DealRegistry = await getAssetRegistry(accept.Deal.getFullyQualifiedType());
  let deal = await DealRegistry.exists(accept.Deal.getIdentifier());

  if (cus == true && deal == true && ex3 == false) {
    throw new Error ("Contract id not found. Please enter the correct id");
  } else if (cus == false && deal == true &&ex3 == true){
    throw new Error ("Customer id not found. Please enter the correct id");

  } else if (cus == true && deal == false &&ex3 == true){
   throw new Error ("No deal have started. Please enter the correct deal");

 
  } else if (cus == true &&  deal == true && ex3 == true){

  if (b.status === 'REJECTED' && b.Deal.$identifier == accept.Deal.$identifier && b.Customerid.$identifier == accept.Customerid.$identifier) {

   throw new Error ("The contract has been rejected")
  } else if (b.status ===  'ACCEPTED' && b.Deal.$identifier == accept.Deal.$identifier && b.Customerid.$identifier == accept.Customerid.$identifier) {

   throw new Error ("The contract has been accepted")
  }
    else if (b.Customerid.$identifier == accept.Customerid.$identifier && b.Deal.$identifier == accept.Deal.$identifier){
   
    contract.status = 'ACCEPTED';
    await assetRegistry.update(contract);

    const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
    await Dregistry.update(accept.Deal);



  } else     {
    throw new Error ("Customer id does not match the deal. Please enter the correct customer id or deal")
  }
  } else {
    throw new Error ("Please enter the correct contract id, customer id and deal number")
  }
  
   const AcceptCEvent = factory.newEvent(ns, 'contractaccepted');
   AcceptCEvent.cc = contract;
   emit(AcceptCEvent);
  
  }


    /**
* Customer reject contract transaction
* @param {org.acme.crmblockchain.rejectContract} reject
* @transaction
*/

async function RejectContract(reject) {

 const factory = getFactory();
 const ns = 'org.acme.crmblockchain';
 const assetRegistry = await getAssetRegistry(ns+'.contract')
 
 
 var contract = reject.Contract;

 let b = await assetRegistry.get(reject.Contract.getIdentifier());
 let ex3 = await assetRegistry.exists(reject.Contract.getIdentifier());

 const customerRegistry = await getParticipantRegistry(reject.Customerid.getFullyQualifiedType());
 let cus = await customerRegistry.exists(reject.Customerid.getIdentifier());

 const DealRegistry = await getAssetRegistry(reject.Deal.getFullyQualifiedType());
 let deal = await DealRegistry.exists(reject.Deal.getIdentifier());
 
 if (cus == true && deal == true && ex3 == false) {
    throw new Error ("Contract id not found. Please enter the correct id");
 } else if (cus == false && deal == true &&ex3 == true){
    throw new Error ("Customer id not found. Please enter the correct id");

 } else if (cus == true && deal == false &&ex3 == true){
   throw new Error ("No deal have started. Please enter the correct deal");

 
 } else if (cus == true &&  deal == true && ex3 == true){
 if (b.status === 'ACCEPTED' && b.Deal.$identifier == reject.Deal.$identifier && b.Customerid.$identifier == reject.Customerid.$identifier) {

  throw new Error ("The contract has been accepted")
 } else if (b.status ===  'REJECTED' && b.Deal.$identifier == reject.Deal.$identifier && b.Customerid.$identifier == reject.Customerid.$identifier) {

  throw new Error ("The contract has been rejected")
 } else if (b.Customerid.$identifier == reject.Customerid.$identifier && b.Deal.$identifier == reject.Deal.$identifier){
 
   contract.status = 'REJECTED';
   contract.RejectReason = reject.RejectReason;
   await assetRegistry.update(contract);

   const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
   await Dregistry.update(reject.Deal);


 }  else     {
 throw new Error ("Customer id does not match the deal. Please enter the correct customer id or deal")
 }
 } else  {
   throw new Error ("Please enter the correct Contract id, deal number and customer id")
 }

   const RejectCEvent = factory.newEvent(ns, 'contractrejected');
   RejectCEvent.cc = contract;
   emit(RejectCEvent);
 
 }

/**
 * This transaction will initiate PO - By customer only
 * @param {org.acme.crmblockchain.initiatePO} newPO
 * @transaction
 */

async function InitiatePO(newPO) {
  
  const factory = getFactory();
  const ns = 'org.acme.crmblockchain';
  
  var po = factory.newResource(ns,'PO',newPO.POid);	
  
  const CRegistry = await getAssetRegistry(newPO.Contract.getFullyQualifiedType());
  let a = await CRegistry.get(newPO.Contract.getIdentifier());
  let e = await CRegistry.exists(newPO.Contract.getIdentifier());

  const customerRegistry = await getParticipantRegistry(newPO.Customerid.getFullyQualifiedType());
  let cus = await customerRegistry.exists(newPO.Customerid.getIdentifier());

  const DealRegistry = await getAssetRegistry(newPO.Deal.getFullyQualifiedType());
  let deal = await DealRegistry.exists(newPO.Deal.getIdentifier());
  let deal2 = await DealRegistry.get(newPO.Deal.getIdentifier());


  if (cus == false && e == false && deal == false ){
    throw new Error('Please enter the correct contract id,deal no and customer id to initiate Purchase Order')
  }
  

  else if (cus == true && deal == true && e == false){
    throw new Error('The contract is not found please try again')
  } else if (cus == false && deal == true && e == true){
    throw new Error('You enter the wrong customer id please try again')

  } else if (cus == true && deal == false && e == true){
    throw new Error('You enter the wrong deal no please try again')
  } else  {

   if (a.status === 'ACCEPTED' && e == true) {
    po.Contract = factory.newRelationship(ns, 'contract' , newPO.Contract.getIdentifier());
   } else if (a.status === 'REJECTED' && e == true) {
    throw new Error('The contract had been rejected.');
   } else if (a.status === 'AWAITING' && e == true) {
     throw new Error('The contract is awaiting customer actions')

   } else {
     throw new Error('Contract does not exists')
   } 

   if (deal == true) {
    if(deal2.purchaseorder != null){
      throw new Error("Invalid Deal");
    }else if(a.Deal.$identifier != newPO.Deal.$identifier) {
      throw new Error("The deal does not match the contract.");

    } else if (deal2.purchaseorder == null && a.Deal.$identifier == newPO.Deal.$identifier){
      po.Deal = factory.newRelationship(ns,'deal',newPO.Deal.getIdentifier());
      let dpo = newPO.Deal;
      dpo.purchaseorder = po;
      await DealRegistry.update(dpo);
    } 
  } else {
    throw new Error ("Deal number not found. Please enter the correctid");
  }
   

   if (a.Customerid.$identifier == newPO.Customerid.$identifier) {
    po.Customerid = factory.newRelationship(ns, 'Customer', newPO.Customerid.getIdentifier());
  } else throw new Error ('The customer id does not match the contract')


   po.date = newPO.date;
   po.details = newPO.details;


   const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
   await Dregistry.update(newPO.Deal);
  
  
   const assetRegistry = await getAssetRegistry('org.acme.crmblockchain.PO');
   await assetRegistry.add(po);
   
 
   const initiateOrderEvent = factory.newEvent(ns, 'initiateOrder');
   initiateOrderEvent.po = po;
   emit(initiateOrderEvent);

} 
}



/**
 * This transaction will add Proposal - By Staff only
 * @param {org.acme.crmblockchain.createProposal} newP
 * @transaction
 */

 async function CreateProposal(newP) {

    const factory = getFactory();
    const ns = 'org.acme.crmblockchain';

    var p = factory.newResource(ns, 'proposal', newP.proposalid);
  
    const dealRegistry = await getAssetRegistry(newP.Deal.getFullyQualifiedType());
    let deal = await dealRegistry.exists(newP.Deal.getIdentifier());
    let deal2 = await dealRegistry.get(newP.Deal.getIdentifier());
    
    //const tryRegistry = await getAssetRegistry('org.acme.crmblockchain.proposal');
    //let d = await tryRegistry.getAll();
    //let d2 = await d.exists(newP.Deal.getIdentifier())

    //let t = await deal2.exists(d) ;
    
    const customerRegistry = await getParticipantRegistry(newP.Customerid.getFullyQualifiedType());
    let cus = await customerRegistry.exists(newP.Customerid.getIdentifier());

    const staffRegistry = await getParticipantRegistry(newP.Staffid.getFullyQualifiedType());
    let staff = await staffRegistry.exists(newP.Staffid.getIdentifier());
    

    let dealRetrieved = await query("GetProposal", {Deal: newP.Deal.$identifier})
    //for (x in d.Deal){
    //  if (x !== newP.Deal.$identifier){
    //    z = false;
    //  } else {
    //   z = true;
    //    break;
    //  }
    //}

    if (deal == true) {
      if(deal2.dealproposal == null){
        p.Deal = factory.newRelationship(ns,'deal',newP.Deal.getIdentifier());
        let dProposal = newP.Deal;
        dProposal.dealproposal = p;
        await dealRegistry.update(dProposal);
      } else if (deal2.dealproposal != null){
        throw new Error("Invalid Deal");
      } 
    } else {
      throw new Error ("Deal number not found. Please enter the correctid");
    }
    
    if (cus == true) {
      p.Customerid = factory.newRelationship(ns, 'Customer', newP.Customerid.getIdentifier());
    } else {
      throw new Error ("Customer id not found. Please enter the correctid");
    }
    
    if (staff == true) {
      p.Staffid = factory.newRelationship(ns, 'Staff', newP.Staffid.getIdentifier());
    } else {
      throw new Error ("Staff id not found. Please enter the correct id");
    }
    
    p.date = newP.date;
    p.details = newP.details;
    p.price = newP.price;
    p.status = 'AWAITING';
    
    
    const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
    await Dregistry.update(newP.Deal);
    
   
    const assetRegistry = await getAssetRegistry('org.acme.crmblockchain.proposal');
    await assetRegistry.add(p);

    const CreateProposalEvent = factory.newEvent(ns, 'proposalcreated');
    CreateProposalEvent.pp = p;
    emit(CreateProposalEvent);
}



 
 /**
 * This transaction will add Contract - By Staff only
 * @param {org.acme.crmblockchain.createContract} newC
 * @transaction
 */

async function CreateContract(newC) {

   const factory = getFactory();
   const ns = 'org.acme.crmblockchain';
   const assetRegistry = await getAssetRegistry('org.acme.crmblockchain.contract');

   var c = factory.newResource(ns, 'contract', newC.contractid);
   
   const PRegistry = await getAssetRegistry(newC.Proposalid.getFullyQualifiedType());
   let a = await PRegistry.get(newC.Proposalid.getIdentifier());
   let e = await PRegistry.exists(newC.Proposalid.getIdentifier());

   const dealRegistry = await getAssetRegistry(newC.Deal.getFullyQualifiedType());
   let deal = await dealRegistry.exists(newC.Deal.getIdentifier());
   let deal2 = await dealRegistry.get(newC.Deal.getIdentifier());

   if (a.status === 'ACCEPTED' && e == true) {
      c.Proposalid = factory.newRelationship(ns, 'proposal' , newC.Proposalid.getIdentifier());
   } else if (a.status === 'REJECTED' && e == true) {
       throw new Error('The proposal had been rejected.');
   } else if (a.status === 'AWAITING' && e == true) {
       throw new Error('The proposal is awaiting customer actions')
   }
      
     else {
       throw new Error('The proposal is not created');
     }


    
   if (a.Customerid.$identifier == newC.Customerid.$identifier) {
     c.Customerid = factory.newRelationship(ns, 'Customer', newC.Customerid.getIdentifier());
   } else throw new Error ('The customer id does not match the proposal')


   if (a.Staffid.$identifier == newC.Staffid.$identifier) {
     c.Staffid = factory.newRelationship(ns, 'Staff' , newC.Staffid.getIdentifier());
   } else throw new Error ('The staff id does not match the proposal.')


   if (deal == true) {
    if(deal2.dealcontract != null){
      throw new Error("Invalid Deal");
    }else if(a.Deal.$identifier != newC.Deal.$identifier) {
      throw new Error("The deal does not match the proposal.");

    } else if (deal2.dealcontract == null && a.Deal.$identifier == newC.Deal.$identifier){
      c.Deal = factory.newRelationship(ns,'deal',newC.Deal.getIdentifier());
      let dcontract = newC.Deal;
      dcontract.dealcontract = c;
      await dealRegistry.update(dcontract);
    } 
  } else {
    throw new Error ("Deal number not found. Please enter the correctid");
  }
   
   
   
   c.date = newC.date;
   c.details = newC.details;
   c.price = newC.price;
   c.status = 'AWAITING';
   
   const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
   await Dregistry.update(newC.Deal);

   await assetRegistry.add(c);

   const CreateContractEvent = factory.newEvent(ns, 'contractcreated');
   CreateContractEvent.cc = c;
   emit(CreateContractEvent);
}



/**
 * This transaction will create SO - By staff only
 * @param {org.acme.crmblockchain.createSO} newSO
 * @transaction
 */

 async function CreateSO(newSO) {
   
   const factory = getFactory();
   const ns = 'org.acme.crmblockchain'

   var so = factory.newResource(ns, 'SaleOrder', newSO.SOid);
   
   const DRegistry = await getAssetRegistry(newSO.Deal.getFullyQualifiedType());
   let a = await DRegistry.get(newSO.Deal.getIdentifier());
   let e = await DRegistry.exists(newSO.Deal.getIdentifier());

   const PORegistry = await getAssetRegistry(newSO.po.getFullyQualifiedType());
   let b = await PORegistry.get(newSO.po.getIdentifier());
   let e2 = await PORegistry.exists(newSO.po.getIdentifier());
   
   if (e2 == true) {

     so.po = factory.newRelationship(ns, 'PO', newSO.po.getIdentifier());

   } else throw new Error('There is no purchase order with the id');



   if (e == true) {
     if(a.saleorder!=null){
       throw new Error("Invalid Deal");
     } else if (b.Deal.$identifier != newSO.Deal.$identifier){
       throw new Error("The deal does not match with the purchase order.")
     } else if (a.saleorder == null && b.Deal.$identifier == newSO.Deal.$identifier) {
       so.Deal = factory.newRelationship(ns, 'deal',newSO.Deal.getIdentifier());
       let dso = newSO.Deal;
       dso.saleorder = so;
       await DRegistry.update(dso);
     } 

   } else throw new Error('The deal not found')
     
   const customerRegistry = await getParticipantRegistry(newSO.Customerid.getFullyQualifiedType());
   let cus = await customerRegistry.exists(newSO.Customerid.getIdentifier());

   if (cus == true) {

   if (b.Customerid.$identifier == newSO.Customerid.$identifier && e2 == true) {
     so.Customerid = factory.newRelationship(ns, 'Customer', newSO.Customerid.getIdentifier());
   } else throw new Error('The customerid does not match with the purchase order');
   
   } else throw new Error('Customer does not exists')


   const staffRegistry = await getParticipantRegistry(newSO.Staffid.getFullyQualifiedType());
   let staff = await staffRegistry.exists(newSO.Staffid.getIdentifier());

   if (staff == true) {

   if (a.Staffid.$identifier == newSO.Staffid.$identifier && e2 == true) {
     so.Staffid = factory.newRelationship(ns, 'Staff' , newSO.Staffid.getIdentifier());

   } else throw new Error('The staff id does is wrong')

   } else throw new Error('Staff enter wrongly')

   so.date = newSO.date;
   so.details = newSO.details;
   so.price = newSO.price;
   so.status = 'PROCESSING';
   
   const assetRegistry = await getAssetRegistry('org.acme.crmblockchain.SaleOrder');
   await assetRegistry.add(so);
   
   const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
   await Dregistry.update(newSO.Deal);

   const createSOEvent = factory.newEvent(ns, 'createSaleOrderevent');
   createSOEvent.so = so;
   emit(createSOEvent);

 }


 /**
 * This transaction will update status of SO - By staff only
 * @param {org.acme.crmblockchain.updateSOStatus} update
 * @transaction
 */

 async function UpdateSO(update) {

  const factory = getFactory();
  const ns = 'org.acme.crmblockchain';
  const assetRegistry = await getAssetRegistry(ns+'.SaleOrder')

  var SO = update.so;

  let b = await assetRegistry.get(update.so.getIdentifier());
  let ex3 = await assetRegistry.exists(update.so.getIdentifier());

  const staffRegistry = await getParticipantRegistry(update.Staffid.getFullyQualifiedType());
  let staff = await staffRegistry.exists(update.Staffid.getIdentifier());


  const DealRegistry = await getAssetRegistry(update.Deal.getFullyQualifiedType());
  let deal = await DealRegistry.exists(update.Deal.getIdentifier());

  if (staff == true && deal == true && ex3 == false) {
    throw new Error ("Sale Order not found. Please enter the correct id");
  } else if (staff == false  && deal == true && ex3 == true){
    throw new Error ("Staff id not found. Please enter the correct id");

  } else if (staff == true && deal == false && ex3 == true){
    throw new Error ("Deal not found. Please enter the correct id");

  } else if (staff == true && deal == true && ex3 == true){

   if (b.Deal.$identifier == update.Deal.$identifier && b.Staffid.$identifier == update.Staffid.$identifier ) {
  
 
   SO.status=update.status;
   await assetRegistry.update(SO);


   const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
   await Dregistry.update(update.Deal);

   const updateSOevent = factory.newEvent(ns, 'updateSOstatusevent');
   updateSOevent.so = update.so;
   updateSOevent.status = update.status;
   emit(updateSOevent);

  }  else   {  
      throw new Error ("Staff does not in charge of the order. Please enter the correct Order")
  } 
  }

  else  {
   throw new Error ("Please enter the correct Order id and staff id")
  }

 }


/**
 * This transaction will create invoice - By staff only
 * @param {org.acme.crmblockchain.createInvoice} newIV
 * @transaction
 */

 async function CreateIV(newIV) {
 
   const factory = getFactory();
   const ns = 'org.acme.crmblockchain'


   var invoice = factory.newResource(ns, 'Invoice', newIV.invoiceid);
   
   const DRegistry = await getAssetRegistry(newIV.Deal.getFullyQualifiedType());
   let a = await DRegistry.get(newIV.Deal.getIdentifier());
   let e = await DRegistry.exists(newIV.Deal.getIdentifier());

   const SORegistry = await getAssetRegistry(newIV.so.getFullyQualifiedType());
   let b = await SORegistry.get(newIV.so.getIdentifier());
   let e2 = await SORegistry.exists(newIV.so.getIdentifier());

   if (e2 == false) {
    throw new Error('Sale Order not found');
     
   } else {
    invoice.so = factory.newRelationship(ns, 'SaleOrder', newIV.so.getIdentifier());
     
   }

   if (e == false) {
     throw new Error('Deal not found');
   } else {
     if (a.inv != null){
       throw new Error("Invalid Deal");
     } else if (b.Deal.$identifier != newIV.Deal.$identifier){
       throw new Error("Deal deos not match with Saleorder");
     } else if (a.inv == null && b.Deal.$identifier == newIV.Deal.$identifier){
       invoice.Deal = factory.newRelationship(ns, 'deal' , newIV.Deal.getIdentifier());
       let dinvoice = newIV.Deal;
       dinvoice.inv = invoice;
       await DRegistry.update(dinvoice); 
     } 
   }
   
   
   const customerRegistry = await getParticipantRegistry(newIV.Customerid.getFullyQualifiedType());
   let cus = await customerRegistry.exists(newIV.Customerid.getIdentifier());

   if (cus == true) {

   if (b.Customerid.$identifier == newIV.Customerid.$identifier && e2 == true) {
     invoice.Customerid = factory.newRelationship(ns, 'Customer', newIV.Customerid.getIdentifier());
   } else throw new Error('The customerid does not match with the sale order');
   
   } else throw new Error('Customer does not exists')


  const staffRegistry = await getParticipantRegistry(newIV.Staffid.getFullyQualifiedType());
   let staff = await staffRegistry.exists(newIV.Staffid.getIdentifier());

   if (staff == true) {

   if (a.Staffid.$identifier == newIV.Staffid.$identifier && b.Staffid.$identifier == newIV.Staffid.$identifier  && e2 == true) {
     invoice.Staffid = factory.newRelationship(ns, 'Staff' , newIV.Staffid.getIdentifier());

   } else throw new Error('The staff id does is wrong')

   } else throw new Error('Staff enter wrongly')

   invoice.date = newIV.date;
   invoice.details = newIV.details;
   invoice.price = newIV.price;
   invoice.paymentstatus = 'UNPAID';
   
   const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
   await Dregistry.update(newIV.Deal);

   const assetRegistry = await getAssetRegistry('org.acme.crmblockchain.Invoice');
   await assetRegistry.add(invoice);
   
   const createIVEvent = factory.newEvent(ns, 'createInvoiceevent');
   createIVEvent.iv = invoice;
   emit(createIVEvent);

 }

 /**
 * This transaction will update payment  - By customer only
 * @param {org.acme.crmblockchain.updatePaymentStatus} update
 * @transaction
 */

async function UpdatePayment(update) {

  const factory = getFactory();
  const ns = 'org.acme.crmblockchain';
  const assetRegistry = await getAssetRegistry(ns+'.Invoice')

  let Payment = update.iv;
  
  let b = await assetRegistry.get(update.iv.getIdentifier());
  let ex3 = await assetRegistry.exists(update.iv.getIdentifier());

  const customerRegistry = await getParticipantRegistry(update.Customerid.getFullyQualifiedType());
  let cus = await customerRegistry.exists(update.Customerid.getIdentifier());

  const DealRegistry = await getAssetRegistry(update.Deal.getFullyQualifiedType());
  let deal = await DealRegistry.exists(update.Deal.getIdentifier());
  
  if (cus == true && deal == true && ex3 == false) {
    throw new Error ("Invoice not found. Please enter the correct id");
  } else if (cus == false && deal == true && ex3 == true){
    throw new Error ("Customer id not found. Please enter the correct id");
  } else if (cus == true && deal == false && ex3 == true){
    throw new Error ("Deal not found. Please enter the correct id");
  } else if (cus == true && deal == true == ex3 == true){

  if (b.statuspayment === "PAID" && b.Customerid.$identifier == update.Customerid.$identifier && b.Deal.$identifier == update.Deal.$identifier) {

    throw new Error("You have cleared all the payment")
  }
 
 
 
  else if (b.Deal.$identifier == update.Deal.$identifier && b.Customerid.$identifier == update.Customerid.$identifier){
  
   Payment.paymentstatus=update.paymentstatus;
   Payment.paymentamount=update.paymentamount;
   Payment.paymenttype=update.paymenttype;
   await assetRegistry.update(Payment);


   const Dregistry = await getAssetRegistry('org.acme.crmblockchain.deal');
   await Dregistry.update(update.Deal);




   const updatePaymentevent = factory.newEvent(ns, 'updatePaymentStatusevent');
   updatePaymentevent.iv = update.iv;
   updatePaymentevent.paymentstatus = update.paymentstatus;
   updatePaymentevent.paymentamount = update.paymentamount;
   updatePaymentevent.paymenttype = update.paymenttype;
   emit(updatePaymentevent);

  }  else   {  
     throw new Error ("The invoice belongs to others. Please enter the correct Order")
  } }

  else  {
   throw new Error ("Please enter the correct Order id and staff id")
  }

}

/**
 * This transaction will add Proposal - By Staff only
 * @param {org.acme.crmblockchain.createDeal} newD
 * @transaction
 */

async function CreateDeal(newD) {


  const factory = getFactory();
  const ns = 'org.acme.crmblockchain';

  const p = factory.newResource(ns, 'deal', newD.dealno);
  

  const customerRegistry = await getParticipantRegistry(newD.Customerid.getFullyQualifiedType());
  let cus = await customerRegistry.exists(newD.Customerid.getIdentifier());

  if (cus == true) {
    p.Customerid = factory.newRelationship(ns, 'Customer', newD.Customerid.getIdentifier());
  } else {
    throw new Error ("Customer id not found. Please enter the correctid");
  }


  const staffRegistry = await getParticipantRegistry(newD.Staffid.getFullyQualifiedType());
  let staff = await staffRegistry.exists(newD.Staffid.getIdentifier());

  if (staff == true) {
    p.Staffid = factory.newRelationship(ns, 'Staff', newD.Staffid.getIdentifier());
  } else {
    throw new Error ("Staff id not found. Please enter the correct id");
  }


  p.date = newD.date;
  p.details = newD.details;


  const assetRegistry = await getAssetRegistry('org.acme.crmblockchain.deal');
  await assetRegistry.add(p);
  
  
}	

