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
import { contractService } from './contract.service';
import { acceptContractService } from "../acceptContract/acceptContract.service";
import { rejectContractService } from "../rejectContract/rejectContract.service";
import { dealService } from "../deal/deal.service";
import { initiatePOService } from '../initiatePO/initiatePO.service';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  providers: [contractService, initiatePOService, dealService, acceptContractService, rejectContractService]
})
export class contractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractid = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  details = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  RejectReason = new FormControl('', Validators.required);
  Customerid = new FormControl('', Validators.required);
  Staffid = new FormControl('', Validators.required);
  Proposalid = new FormControl('', Validators.required);
  Deal = new FormControl('', Validators.required);
  POid = new FormControl('', Validators.required);

  constructor(public servicecontract: contractService,
    public servicedeal: dealService,
    private serviceinitiatePO: initiatePOService,
    private serviceacceptContract: acceptContractService,
    private servicerejectContract: rejectContractService,
    fb: FormBuilder) {
    this.myForm = fb.group({
      contractid: this.contractid,
      date: this.date,
      details: this.details,
      price: this.price,
      status: this.status,
      RejectReason: this.RejectReason,
      Customerid: this.Customerid,
      Staffid: this.Staffid,
      Proposalid: this.Proposalid,
      Deal: this.Deal
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicecontract.getAll()
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
      $class: 'org.acme.crmblockchain.contract',
      'contractid': this.contractid.value,
      'date': this.date.value,
      'details': this.details.value,
      'price': this.price.value,
      'status': this.status.value,
      'Customerid': this.Customerid.value,
      'Staffid': this.Staffid.value,
      'Proposalid': this.Proposalid.value,
      'Deal': this.Deal.value
    };

    this.myForm.setValue({
      'contractid': null,
      'date': null,
      'details': null,
      'price': null,
      'status': null,
      'Customerid': null,
      'Staffid': null,
      'Proposalid': null,
      'Deal': null
    });

    return this.servicecontract.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractid': null,
        'date': null,
        'details': null,
        'price': null,
        'status': null,
        'Customerid': null,
        'Staffid': null,
        'Proposalid': null,
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
      $class: 'org.acme.crmblockchain.contract',
      'date': this.date.value,
      'details': this.details.value,
      'price': this.price.value,
      'status': this.status.value,
      'Customerid': this.Customerid.value,
      'Staffid': this.Staffid.value,
      'Proposalid': this.Proposalid.value,
      'Deal': this.Deal.value
    };

    return this.servicecontract.updateAsset(form.get('contractid').value, this.asset)
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

    return this.servicecontract.deleteAsset(this.currentId)
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

    this.checkPO(id);
  }

  private Proposalid1;
  private date1;
  private details1;
  private price1;
  private status1;
  private Staffid1;
  private Customerid1;
  private Deal1;
  private RejectReason1;
  private contractid1;

  setId2(id1,id2,id3,id4,id5,id6,id7,id8,id9,id10){
    this.contractid1 = id1;
    this.date1 = id2;
    this.details1 = id3;
    this.price1 = id4;
    this.status1 = id5;
    this.Customerid1 = id6;
    this.Staffid1 = id7;
    this.Proposalid1 = id8;
    this.Deal1 = id9;
    this.RejectReason1 = id10;

  }


  resetForm(): void {
    this.myForm.setValue({
      'contractid': null,
      'date': null,
      'details': null,
      'price': null,
      'status': null,
      'Customerid': null,
      'Staffid': null,
      'Proposalid': null,
      'Deal': null
      });
  }

  private Contract;
  addTransaction(): Promise<any> {
    let Transaction = {
      $class: 'org.acme.crmblockchain.acceptContract',
      'Contract': 'resource:org.acme.crmblockchain.contract#' + this.currentId,
      'Customerid': this.currentId2,
      'Deal': this.currentId3
    };


    return this.serviceacceptContract.addTransaction(Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      alert('Successfully accept contract ' + this.currentId)

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
    let Transaction = {
      $class: 'org.acme.crmblockchain.rejectContract',
      'Contract': 'resource:org.acme.crmblockchain.contract#' + this.currentId,
      'Customerid': this.currentId2,
      'RejectReason': id,
      'Deal': this.currentId3
    };


    return this.servicerejectContract.addTransaction(Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      alert('Successfully reject contract ' + this.currentId)

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


  hasvalue = false;
  private temp_deal;
  foundDeal:any =[];
  checkPO(id){
    
    let allAsset = [];
    this.servicedeal.getAll().subscribe(
      result => {allAsset=result;
        this.foundDeal = [];

        for(let i=0; i<allAsset.length; i++){
          if(allAsset[i].dealcontract == id && allAsset[i].purchaseorder == null){
            this.foundDeal.push(allAsset[i])
          }
        }

      }
    )
  }

  POid_insert: String;
  date_insert: String;
  details_insert: String;
  private num = Math.floor(100000 + Math.random() * 900000);

  addPO(date, details): Promise<any> {
    let Transaction = {
      $class: 'org.acme.crmblockchain.initiatePO',
      'POid': 'PO'+this.num,
      'date': date,
      'details': details,
      'Contract': 'resource:org.acme.crmblockchain.contract#' + this.currentId,
      'Customerid': this.currentId2,
      'Deal': this.currentId3,
    };


    return this.serviceinitiatePO.addTransaction(Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      alert('Successfully initiate PO'+ this.num);
      
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
