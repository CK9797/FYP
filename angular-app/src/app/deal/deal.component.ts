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
import { dealService } from './deal.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css'],
  providers: [dealService]
})
export class dealComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  dealno = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  details = new FormControl('', Validators.required);
  Staffid = new FormControl('', Validators.required);
  Customerid = new FormControl('', Validators.required);
  dealproposal = new FormControl('', Validators.required);
  dealcontract = new FormControl('', Validators.required);
  purchaseorder = new FormControl('', Validators.required);
  saleorder = new FormControl('', Validators.required);
  inv = new FormControl('', Validators.required);

  constructor(public servicedeal: dealService, fb: FormBuilder) {
    this.myForm = fb.group({
      dealno: this.dealno,
      date: this.date,
      details: this.details,
      Staffid: this.Staffid,
      Customerid: this.Customerid,
      dealproposal: this.dealproposal,
      dealcontract: this.dealcontract,
      purchaseorder: this.purchaseorder,
      saleorder: this.saleorder,
      inv: this.inv
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicedeal.getAll()
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
      $class: 'org.acme.crmblockchain.deal',
      'dealno': this.dealno.value,
      'date': this.date.value,
      'details': this.details.value,
      'Staffid': this.Staffid.value,
      'Customerid': this.Customerid.value,
      'dealproposal': this.dealproposal.value,
      'dealcontract': this.dealcontract.value,
      'purchaseorder': this.purchaseorder.value,
      'saleorder': this.saleorder.value,
      'inv': this.inv.value
    };

    this.myForm.setValue({
      'dealno': null,
      'date': null,
      'details': null,
      'Staffid': null,
      'Customerid': null,
      'dealproposal': null,
      'dealcontract': null,
      'purchaseorder': null,
      'saleorder': null,
      'inv': null
    });

    return this.servicedeal.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'dealno': null,
        'date': null,
        'details': null,
        'Staffid': null,
        'Customerid': null,
        'dealproposal': null,
        'dealcontract': null,
        'purchaseorder': null,
        'saleorder': null,
        'inv': null
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
      $class: 'org.acme.crmblockchain.deal',
      'date': this.date.value,
      'details': this.details.value,
      'Staffid': this.Staffid.value,
      'Customerid': this.Customerid.value,
      'dealproposal': this.dealproposal.value,
      'dealcontract': this.dealcontract.value,
      'purchaseorder': this.purchaseorder.value,
      'saleorder': this.saleorder.value,
      'inv': this.inv.value
    };

    return this.servicedeal.updateAsset(form.get('dealno').value, this.asset)
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

    return this.servicedeal.deleteAsset(this.currentId)
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

  private dealno1;
  private date1;
  private details1;
  private Staffid1;
  private Customerid1;
  private dealproposal1;
  private dealcontract1;
  private purchaseorder1;
  private saleorder1;
  private inv1;
  setId(id1,id2,id3,id4,id5,id6,id7,id8,id9,id10): void {
    this.dealno1 = id1;
    this.date1 = id2;
    this.details1 = id3;
    this.Staffid1 = id4;
    this.Customerid1 = id5;
    this.dealproposal1 = id6;
    this.dealcontract1 = id7;
    this.purchaseorder1 = id8;
    this.saleorder1 = id9;
    this.inv1 = id10;
  }

  getForm(id: any): Promise<any> {

    return this.servicedeal.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'dealno': null,
        'date': null,
        'details': null,
        'Staffid': null,
        'Customerid': null,
        'dealproposal': null,
        'dealcontract': null,
        'purchaseorder': null,
        'saleorder': null,
        'inv': null
      };

      if (result.dealno) {
        formObject.dealno = result.dealno;
      } else {
        formObject.dealno = null;
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

      if (result.dealproposal) {
        formObject.dealproposal = result.dealproposal;
      } else {
        formObject.dealproposal = null;
      }

      if (result.dealcontract) {
        formObject.dealcontract = result.dealcontract;
      } else {
        formObject.dealcontract = null;
      }

      if (result.purchaseorder) {
        formObject.purchaseorder = result.purchaseorder;
      } else {
        formObject.purchaseorder = null;
      }

      if (result.saleorder) {
        formObject.saleorder = result.saleorder;
      } else {
        formObject.saleorder = null;
      }

      if (result.inv) {
        formObject.inv = result.inv;
      } else {
        formObject.inv = null;
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
      'dealno': null,
      'date': null,
      'details': null,
      'Staffid': null,
      'Customerid': null,
      'dealproposal': null,
      'dealcontract': null,
      'purchaseorder': null,
      'saleorder': null,
      'inv': null
      });
  }

}
