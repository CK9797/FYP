/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomerService } from './Customer.service';
import { dealService } from "../deal/deal.service";
import { contractService } from '../contract/contract.service';
import { proposalService } from '../proposal/proposal.service';
import { POService } from '../PO/PO.service';
import { SaleOrderService } from '../SaleOrder/SaleOrder.service';
import { InvoiceService } from '../Invoice/Invoice.service';



import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['./Customer.component.css'],
  providers: [CustomerService, dealService, contractService, InvoiceService, proposalService,POService,SaleOrderService]
})
export class CustomerComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  customerid = new FormControl('', Validators.required);
  customername = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  phoneNumber = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);


  constructor(public serviceCustomer: CustomerService,
    public servicecontract: contractService,
    public servicedeal: dealService,
    public serviceproposal: proposalService,
    public servicePO: POService, 
    public serviceInvoice: InvoiceService,
    public serviceSaleOrder: SaleOrderService,
    fb: FormBuilder) {
    this.myForm = fb.group({
      customerid: this.customerid,
      customername: this.customername,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address
    });
  };

  ngOnInit(): void {
    this.loadAll();
    this.loadAllInvoice();
    this.loadAllDeal();
    this.loadAllcontract();
    this.loadAllproposal();
    this.loadAllPO();
    this.loadAllSO();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCustomer.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.acme.crmblockchain.Customer',
      'customerid': this.customerid.value,
      'customername': this.customername.value,
      'email': this.email.value,
      'phoneNumber': this.phoneNumber.value,
      'address': this.address.value
    };

    this.myForm.setValue({
      'customerid': null,
      'customername': null,
      'email': null,
      'phoneNumber': null,
      'address': null
    });

    return this.serviceCustomer.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'customerid': null,
        'customername': null,
        'email': null,
        'phoneNumber': null,
        'address': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.acme.crmblockchain.Customer',
      'customername': this.customername.value,
      'email': this.email.value,
      'phoneNumber': this.phoneNumber.value,
      'address': this.address.value
    };

    return this.serviceCustomer.updateParticipant(form.get('customerid').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceCustomer.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCustomer.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'customerid': null,
        'customername': null,
        'email': null,
        'phoneNumber': null,
        'address': null
      };

      if (result.customerid) {
        formObject.customerid = result.customerid;
      } else {
        formObject.customerid = null;
      }

      if (result.customername) {
        formObject.customername = result.customername;
      } else {
        formObject.customername = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.phoneNumber) {
        formObject.phoneNumber = result.phoneNumber;
      } else {
        formObject.phoneNumber = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'customerid': null,
      'customername': null,
      'email': null,
      'phoneNumber': null,
      'address': null
    });
  }

  private allInvoice;
  private allDeal;
  private allproposal;
  private allcontract;
  private allSO;
  private allPO;

  private inlen;
  private dlen;
  private polen;
  private solen;
  private plen;
  private clen;


  private inpaid;
  loadAllInvoice(): Promise<any> {
    const tempList = [];
    return this.serviceInvoice.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allInvoice = tempList;

      this.inlen= this.allInvoice.length;

      this.inpaid = this.allInvoice.filter((obj)=> obj.paymentstatus ==="PAID").length;

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  private proaccept;
  private proreject;

  loadAllproposal(): Promise<any> {
    const tempList = [];
    return this.serviceproposal.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allproposal = tempList;
      this.plen=this.allproposal.length;

      this.proaccept = this.allproposal.filter((obj)=> obj.status === 'ACCEPTED').length;
      this.proreject = this.allproposal.filter((obj)=> obj.status === 'REJECTED').length;

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }
private contreject;
private contaccept;
  loadAllcontract(): Promise<any> {
    const tempList = [];
    return this.servicecontract.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allcontract = tempList;
      this.clen =this.allcontract.length;

      //const s="PAID";
      this.contaccept = this.allcontract.filter((obj)=> obj.status === 'ACCEPTED').length;
      this.contreject = this.allcontract.filter((obj)=> obj.status === 'REJECTED').length;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  loadAllDeal(): Promise<any> {
    const tempList = [];
    return this.servicedeal.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allDeal = tempList;
      this.dlen=this.allDeal.length;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  loadAllSO(): Promise<any> {
    const tempList = [];
    return this.serviceSaleOrder.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allSO = tempList;

      this.solen = this.allSO.length;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  loadAllPO(): Promise<any> {
    const tempList = [];
    return this.servicePO.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allPO = tempList;

      this.polen= this.allPO.length;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }
}
