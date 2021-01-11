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
import { proposalService } from './proposal.service';
import { acceptProposalService } from '../acceptProposal/acceptProposal.service';
import { rejectProposalService } from '../rejectProposal/rejectProposal.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
  providers: [proposalService, acceptProposalService, rejectProposalService]
})
export class proposalComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private Transaction;

  proposalid = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  details = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  Staffid = new FormControl('', Validators.required);
  Customerid = new FormControl('', Validators.required);
  Deal = new FormControl('', Validators.required);
  RejectReason = new FormControl('', Validators.required);

  Proposal = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);

  constructor(public serviceproposal: proposalService, 
    private serviceacceptProposal: acceptProposalService,
    private servicerejectProposal: rejectProposalService, 
    fb: FormBuilder,  ) {
    this.myForm = fb.group({
      proposalid: this.proposalid,
      date: this.date,
      details: this.details,
      price: this.price,
      status: this.status,
      RejectReason: this.RejectReason,
      Staffid: this.Staffid,
      Customerid: this.Customerid,
      Deal: this.Deal
    });
    this.myForm2 = fb.group({
      Proposal: this.Proposal,
      Customerid: this.Customerid,
      Deal: this.Deal,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceproposal.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.crmblockchain.proposal',
      'proposalid': this.proposalid.value,
      'date': this.date.value,
      'details': this.details.value,
      'price': this.price.value,
      'status': this.status.value,
      'RejectReason':this.RejectReason.value,
      'Staffid': this.Staffid.value,
      'Customerid': this.Customerid.value,
      'Deal': this.Deal.value
    };

    this.myForm.setValue({
      'proposalid': null,
      'date': null,
      'details': null,
      'price': null,
      'status': null,
      'Staffid': null,
      'Customerid': null,
      'Deal': null
    });

    return this.serviceproposal.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'proposalid': null,
        'date': null,
        'details': null,
        'price': null,
        'status': null,
        'Staffid': null,
        'Customerid': null,
        'Deal': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.crmblockchain.proposal',
      'date': this.date.value,
      'details': this.details.value,
      'price': this.price.value,
      'status': this.status.value,
      'RejectReason':this.status.value,
      'Staffid': this.Staffid.value,
      'Customerid': this.Customerid.value,
      'Deal': this.Deal.value
    };

    return this.serviceproposal.updateAsset(form.get('proposalid').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceproposal.deleteAsset(this.currentId)
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

  private currentId2;
  private currentId3;

  
  setId(id, id2, id3): void {
    this.currentId = id;
    this.currentId2 = id2;
    this.currentId3 = id3;
  }

  private proposalid1;
  private date1;
  private details1;
  private price1;
  private status1;
  private Staffid1;
  private Customerid1;
  private Deal1;
  private RejectReason1;

  setId2(id1,id2,id3,id4,id5,id6,id7,id8, id9){
    this.proposalid1 = id1;
    this.date1 = id2;
    this.details1 = id3;
    this.price1 = id4;
    this.status1 = id5;
    this.Staffid1 = id6;
    this.Customerid1 = id7;
    this.Deal1 = id8;
    this.RejectReason1 = id9;

  }

  getForm(id: any): Promise<any> {

    return this.serviceproposal.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'proposalid': null,
        'date': null,
        'details': null,
        'price': null,
        'status': null,
        'Staffid': null,
        'Customerid': null,
        'Deal': null
      };

      if (result.proposalid) {
        formObject.proposalid = result.proposalid;
      } else {
        formObject.proposalid = null;
      }

      if (result.date) {
        formObject.date = result.date;
      } else {
        formObject.date = null;
      }

      if (result.details) {
        formObject.details = result.details;
      } else {
        formObject.details = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.Staffid) {
        formObject.Staffid = result.Staffid;
      } else {
        formObject.Staffid = null;
      }

      if (result.Customerid) {
        formObject.Customerid = result.Customerid;
      } else {
        formObject.Customerid = null;
      }

      if (result.Deal) {
        formObject.Deal = result.Deal;
      } else {
        formObject.Deal = null;
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
      'proposalid': null,
      'date': null,
      'details': null,
      'price': null,
      'status': null,
      'Staffid': null,
      'Customerid': null,
      'Deal': null
      });
  }

  addTransaction(): Promise<any> {
    this.Transaction = {
      $class: 'org.acme.crmblockchain.acceptProposal',
      'Proposal': 'resource:org.acme.crmblockchain.proposal#' + this.currentId,
      'Customerid': this.currentId2,
      'Deal': this.currentId3,
    };

    

    return this.serviceacceptProposal.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      alert('Successfully accept proposal ' + this.currentId)
      
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  addTransaction2(id): Promise<any> {
    this.Transaction = {
      $class: 'org.acme.crmblockchain.rejectProposal',
      'Proposal': 'resource:org.acme.crmblockchain.proposal#' + this.currentId,
      'Customerid': this.currentId2,
      'RejectReason': id,
      'Deal': this.currentId3,
    };

    

    return this.servicerejectProposal.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      alert('Successfully reject proposal ' + this.currentId)
      
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }





  

}
