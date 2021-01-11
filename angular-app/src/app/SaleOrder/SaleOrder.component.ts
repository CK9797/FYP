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
import { SaleOrderService } from './SaleOrder.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-saleorder',
  templateUrl: './SaleOrder.component.html',
  styleUrls: ['./SaleOrder.component.css'],
  providers: [SaleOrderService]
})
export class SaleOrderComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  SOid = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  details = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  po = new FormControl('', Validators.required);
  Customerid = new FormControl('', Validators.required);
  Staffid = new FormControl('', Validators.required);
  Deal = new FormControl('', Validators.required);

  constructor(public serviceSaleOrder: SaleOrderService, fb: FormBuilder) {
    this.myForm = fb.group({
      SOid: this.SOid,
      date: this.date,
      details: this.details,
      price: this.price,
      status: this.status,
      po: this.po,
      Customerid: this.Customerid,
      Staffid: this.Staffid,
      Deal: this.Deal
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceSaleOrder.getAll()
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
      $class: 'org.acme.crmblockchain.SaleOrder',
      'SOid': this.SOid.value,
      'date': this.date.value,
      'details': this.details.value,
      'price': this.price.value,
      'status': this.status.value,
      'po': this.po.value,
      'Customerid': this.Customerid.value,
      'Staffid': this.Staffid.value,
      'Deal': this.Deal.value
    };

    this.myForm.setValue({
      'SOid': null,
      'date': null,
      'details': null,
      'price': null,
      'status': null,
      'po': null,
      'Customerid': null,
      'Staffid': null,
      'Deal': null
    });

    return this.serviceSaleOrder.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'SOid': null,
        'date': null,
        'details': null,
        'price': null,
        'status': null,
        'po': null,
        'Customerid': null,
        'Staffid': null,
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
      $class: 'org.acme.crmblockchain.SaleOrder',
      'date': this.date.value,
      'details': this.details.value,
      'price': this.price.value,
      'status': this.status.value,
      'po': this.po.value,
      'Customerid': this.Customerid.value,
      'Staffid': this.Staffid.value,
      'Deal': this.Deal.value
    };

    return this.serviceSaleOrder.updateAsset(form.get('SOid').value, this.asset)
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

    return this.serviceSaleOrder.deleteAsset(this.currentId)
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

  private SOid1;
  private date1;
  private details1;
  private price1;
  private status1;
  private Staffid1;
  private Customerid1;
  private Deal1;
  private po1;

  setId2(id1,id2,id3,id4,id5,id6,id7,id8,id9,id10){
    this.SOid1 = id1;
    this.date1 = id2;
    this.details1 = id3;
    this.price1 = id4;
    this.status1 = id5;
    this.po1 = id6;
    this.Customerid1 = id7;
    this.Staffid1 = id8;
    this.Deal1 = id9;

  }


  getForm(id: any): Promise<any> {

    return this.serviceSaleOrder.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'SOid': null,
        'date': null,
        'details': null,
        'price': null,
        'status': null,
        'po': null,
        'Customerid': null,
        'Staffid': null,
        'Deal': null
      };

      if (result.SOid) {
        formObject.SOid = result.SOid;
      } else {
        formObject.SOid = null;
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

      if (result.po) {
        formObject.po = result.po;
      } else {
        formObject.po = null;
      }

      if (result.Customerid) {
        formObject.Customerid = result.Customerid;
      } else {
        formObject.Customerid = null;
      }

      if (result.Staffid) {
        formObject.Staffid = result.Staffid;
      } else {
        formObject.Staffid = null;
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
      'SOid': null,
      'date': null,
      'details': null,
      'price': null,
      'status': null,
      'po': null,
      'Customerid': null,
      'Staffid': null,
      'Deal': null
      });
  }

}
