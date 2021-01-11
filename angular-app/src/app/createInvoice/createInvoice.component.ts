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
import { createInvoiceService } from './createInvoice.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createInvoice.component.html',
  styleUrls: ['./createInvoice.component.css'],
  providers: [createInvoiceService]
})
export class createInvoiceComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  invoiceid = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  paymentstatus = new FormControl('', Validators.required);
  details = new FormControl('', Validators.required);
  so = new FormControl('', Validators.required);
  Customerid = new FormControl('', Validators.required);
  Staffid = new FormControl('', Validators.required);
  Deal = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicecreateInvoice: createInvoiceService, fb: FormBuilder) {
    this.myForm = fb.group({
      invoiceid: this.invoiceid,
      date: this.date,
      price: this.price,
      paymentstatus: this.paymentstatus,
      details: this.details,
      so: this.so,
      Customerid: this.Customerid,
      Staffid: this.Staffid,
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
    return this.servicecreateInvoice.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.acme.crmblockchain.createInvoice',
      'invoiceid': this.invoiceid.value,
      'date': this.date.value,
      'price': this.price.value,
      'paymentstatus': this.paymentstatus.value,
      'details': this.details.value,
      'so': this.so.value,
      'Customerid': this.Customerid.value,
      'Staffid': this.Staffid.value,
      'Deal': this.Deal.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'invoiceid': null,
      'date': null,
      'price': null,
      'paymentstatus': null,
      'details': null,
      'so': null,
      'Customerid': null,
      'Staffid': null,
      'Deal': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicecreateInvoice.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'invoiceid': null,
        'date': null,
        'price': null,
        'paymentstatus': null,
        'details': null,
        'so': null,
        'Customerid': null,
        'Staffid': null,
        'Deal': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.acme.crmblockchain.createInvoice',
      'invoiceid': this.invoiceid.value,
      'date': this.date.value,
      'price': this.price.value,
      'paymentstatus': this.paymentstatus.value,
      'details': this.details.value,
      'so': this.so.value,
      'Customerid': this.Customerid.value,
      'Staffid': this.Staffid.value,
      'Deal': this.Deal.value,
      'timestamp': this.timestamp.value
    };

    return this.servicecreateInvoice.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.servicecreateInvoice.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.servicecreateInvoice.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'invoiceid': null,
        'date': null,
        'price': null,
        'paymentstatus': null,
        'details': null,
        'so': null,
        'Customerid': null,
        'Staffid': null,
        'Deal': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.invoiceid) {
        formObject.invoiceid = result.invoiceid;
      } else {
        formObject.invoiceid = null;
      }

      if (result.date) {
        formObject.date = result.date;
      } else {
        formObject.date = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.paymentstatus) {
        formObject.paymentstatus = result.paymentstatus;
      } else {
        formObject.paymentstatus = null;
      }

      if (result.details) {
        formObject.details = result.details;
      } else {
        formObject.details = null;
      }

      if (result.so) {
        formObject.so = result.so;
      } else {
        formObject.so = null;
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

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'invoiceid': null,
      'date': null,
      'price': null,
      'paymentstatus': null,
      'details': null,
      'so': null,
      'Customerid': null,
      'Staffid': null,
      'Deal': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
