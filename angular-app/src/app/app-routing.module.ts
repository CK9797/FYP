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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { proposalComponent } from './proposal/proposal.component';
import { contractComponent } from './contract/contract.component';
import { POComponent } from './PO/PO.component';
import { InvoiceComponent } from './Invoice/Invoice.component';
import { dealComponent } from './deal/deal.component';
import { SaleOrderComponent } from './SaleOrder/SaleOrder.component';

import { CustomerComponent } from './Customer/Customer.component';
import { StaffComponent } from './Staff/Staff.component';

import { acceptProposalComponent } from './acceptProposal/acceptProposal.component';
import { rejectProposalComponent } from './rejectProposal/rejectProposal.component';
import { acceptContractComponent } from './acceptContract/acceptContract.component';
import { rejectContractComponent } from './rejectContract/rejectContract.component';
import { initiatePOComponent } from './initiatePO/initiatePO.component';
import { updatePaymentStatusComponent } from './updatePaymentStatus/updatePaymentStatus.component';
import { createProposalComponent } from './createProposal/createProposal.component';
import { createContractComponent } from './createContract/createContract.component';
import { createDealComponent } from './createDeal/createDeal.component';
import { createSOComponent } from './createSO/createSO.component';
import { updateSOStatusComponent } from './updateSOStatus/updateSOStatus.component';
import { createInvoiceComponent } from './createInvoice/createInvoice.component';
import { LoginComponent } from "./login/login.component";
import { HistoryComponent } from './history/history.component';
  
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'proposal', component: proposalComponent },
  { path: 'contract', component: contractComponent },
  { path: 'PO', component: POComponent },
  { path: 'Invoice', component: InvoiceComponent },
  { path: 'deal', component: dealComponent },
  { path: 'SaleOrder', component: SaleOrderComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'Staff', component: StaffComponent },
  { path: 'acceptProposal', component: acceptProposalComponent },
  { path: 'rejectProposal', component: rejectProposalComponent },
  { path: 'acceptContract', component: acceptContractComponent },
  { path: 'rejectContract', component: rejectContractComponent },
  { path: 'initiatePO', component: initiatePOComponent },
  { path: 'updatePaymentStatus', component: updatePaymentStatusComponent },
  { path: 'createProposal', component: createProposalComponent },
  { path: 'createContract', component: createContractComponent },
  { path: 'createDeal', component: createDealComponent },
  { path: 'createSO', component: createSOComponent },
  { path: 'updateSOStatus', component: updateSOStatusComponent },
  { path: 'createInvoice', component: createInvoiceComponent },
  { path: 'login', component: LoginComponent},
  { path: 'history', component: HistoryComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
