import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private links = new Array<{ text: string, path: string }>();
  private Transactionlinks = new Array<{ text: string, path: string }>();
  private isLoggedIn = new Subject<boolean>();

  constructor() { 
    this.addItem({ text: 'Login', path: 'login' });
    this.isLoggedIn.next(false);
  }

  getLinks() {
    return this.links;
  }

  getTransactionLinks() {
    return this.Transactionlinks;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }
 
  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
 
    if (!status) {
      this.clearAllItems();
      this.addItem({ text: 'Login', path: 'login' });
    }
  }
 
  updateNavAfterAuth(role: string): void {
    this.removeItem({ text: 'Login' });
 
    if (role === 'Staff') {
      this.addTransactionItem({ text: 'createDeal', path: 'createDeal'});
      this.addTransactionItem({ text: 'createProposal', path: 'createProposal'});
      this.addTransactionItem({ text: 'createContract', path: 'creatContract'});
      this.addTransactionItem({ text: 'createSO', path: 'createSO'});
      this.addTransactionItem({ text: 'updateSOStatus', path: 'updateSOStatus'});
      this.addTransactionItem({ text: 'createInvoice', path: 'createInvoice'});
    } else if (role === 'Customer') {
      this.addTransactionItem({ text: 'acceptProposal', path: 'acceptProposal'});
      this.addTransactionItem({ text: 'rejectProposal', path: 'rejectProposal'});
      this.addTransactionItem({ text: 'acceptContract', path: 'acceptContract'});
      this.addTransactionItem({ text: 'rejectContract', path: 'rejectContract'});
      this.addTransactionItem({ text: 'initiatePO', path: 'initiatePO'});
      this.addTransactionItem({ text: 'updatePaymentStatus', path: 'updatePaymentStatus'});
    }
  }
 
  addItem({ text, path }) {
    this.links.push({ text: text, path: path });
  }

  addTransactionItem({ text, path }) {
    this.Transactionlinks.push({ text: text, path: path });
  }
 
  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }
 
  clearAllItems() {
    this.links.length = 0;
    this.Transactionlinks.length = 0;
  }


}
