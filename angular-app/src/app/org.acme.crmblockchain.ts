import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.crmblockchain{
   export class Customer extends Participant {
      customerid: string;
      customername: string;
      email: string;
      phoneNumber: string;
      address: string;
   }
   export class Staff extends Participant {
      staffid: string;
      staffname: string;
      email: string;
      phoneNumber: string;
   }
   export enum status {
      ACCEPTED,
      REJECTED,
      AWAITING,
   }
   export class proposal extends Asset {
      proposalid: string;
      date: string;
      details: string;
      price: string;
      status: status;
      Staffid: Staff;
      Customerid: Customer;
      Deal: deal;
   }
   export class acceptProposal extends Transaction {
      Proposal: proposal;
      Customerid: Customer;
      Deal: deal;
   }
   export class rejectProposal extends Transaction {
      Proposal: proposal;
      Customerid: Customer;
      Deal: deal;
   }
   export class proposalaccepted extends Event {
      pp: proposal;
   }
   export class proposalrejected extends Event {
      pp: proposal;
   }
   export class contract extends Asset {
      contractid: string;
      date: string;
      details: string;
      price: string;
      status: status;
      Customerid: Customer;
      Staffid: Staff;
      Proposalid: proposal;
      Deal: deal;
   }
   export class acceptContract extends Transaction {
      Contract: contract;
      Customerid: Customer;
      Deal: deal;
   }
   export class rejectContract extends Transaction {
      Contract: contract;
      Customerid: Customer;
      Deal: deal;
   }
   export class contractaccepted extends Event {
      cc: contract;
   }
   export class contractrejected extends Event {
      cc: contract;
   }
   export class PO extends Asset {
      POid: string;
      date: string;
      details: string;
      Contract: contract;
      Customerid: Customer;
      Deal: deal;
   }
   export class initiatePO extends Transaction {
      POid: string;
      date: string;
      details: string;
      Contract: contract;
      Customerid: Customer;
      Deal: deal;
   }
   export class initiateOrder extends Event {
      po: PO;
   }
   export class Invoice extends Asset {
      invoiceid: string;
      date: string;
      price: string;
      paymentstatus: statuspayment;
      paymentamount: string;
      paymenttype: string;
      paymentproof: string;
      details: string;
      so: SaleOrder;
      Customerid: Customer;
      Staffid: Staff;
      Deal: deal;
   }
   export enum statuspayment {
      PAID,
      UNPAID,
   }
   export class updatePaymentStatus extends Transaction {
      iv: Invoice;
      Customerid: Customer;
      Deal: deal;
      paymentstatus: statuspayment;
      paymentamount: string;
      paymenttype: string;
      paymentproof: string;
   }
   export class updatePaymentStatusevent extends Event {
      iv: Invoice;
      paymentstatus: statuspayment;
      paymentamount: string;
      paymenttype: string;
      paymentproof: string;
   }
   export class createProposal extends Transaction {
      proposalid: string;
      date: string;
      details: string;
      price: string;
      status: status;
      Staffid: Staff;
      Customerid: Customer;
      Deal: deal;
   }
   export class proposalcreated extends Event {
      pp: proposal;
   }
   export class createContract extends Transaction {
      contractid: string;
      date: string;
      details: string;
      price: string;
      status: status;
      Customerid: Customer;
      Staffid: Staff;
      Proposalid: proposal;
      Deal: deal;
   }
   export class contractcreated extends Event {
      cc: contract;
   }
   export enum orderstatus {
      PROCESSING,
      SHIPPING,
      DELIVERED,
   }
   export class deal extends Asset {
      dealno: string;
      date: string;
      details: string;
      Staffid: Staff;
      Customerid: Customer;
      dealproposal: proposal;
      dealcontract: contract;
      purchaseorder: PO;
      saleorder: SaleOrder;
      inv: Invoice;
   }
   export class createDeal extends Transaction {
      dealno: string;
      date: string;
      details: string;
      Staffid: Staff;
      Customerid: Customer;
   }
   export class SaleOrder extends Asset {
      SOid: string;
      date: string;
      details: string;
      price: string;
      status: orderstatus;
      po: PO;
      Customerid: Customer;
      Staffid: Staff;
      Deal: deal;
   }
   export class createSO extends Transaction {
      SOid: string;
      details: string;
      date: string;
      price: string;
      status: orderstatus;
      po: PO;
      Deal: deal;
      Customerid: Customer;
      Staffid: Staff;
   }
   export class createSaleOrderevent extends Event {
      so: SaleOrder;
   }
   export class updateSOStatus extends Transaction {
      so: SaleOrder;
      status: orderstatus;
      Staffid: Staff;
      Deal: deal;
   }
   export class updateSOstatusevent extends Event {
      so: SaleOrder;
      status: orderstatus;
   }
   export class createInvoice extends Transaction {
      invoiceid: string;
      date: string;
      price: string;
      paymentstatus: statuspayment;
      details: string;
      so: SaleOrder;
      Customerid: Customer;
      Staffid: Staff;
      Deal: deal;
   }
   export class createInvoiceevent extends Event {
      iv: Invoice;
   }
// }
