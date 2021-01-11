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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule} from '@angular/material';

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
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HistoryComponent } from './history/history.component';

import { acceptContractService } from "./acceptContract/acceptContract.service";
import { rejectContractService } from "./rejectContract/rejectContract.service";
import { updateSOStatusService } from './updateSOStatus/updateSOStatus.service';
import { initiatePOService } from './initiatePO/initiatePO.service';
import { acceptProposalService } from './acceptProposal/acceptProposal.service';
import { rejectProposalService } from './rejectProposal/rejectProposal.service';
import { createContractService } from './createContract/createContract.service';
import { createDealService } from './createDeal/createDeal.service';
import { createInvoiceService } from './createInvoice/createInvoice.service';
import { createProposalService } from './createProposal/createProposal.service';
import { createSOService } from './createSO/createSO.service';
import { updatePaymentStatusService } from './updatePaymentStatus/updatePaymentStatus.service';
import { dealService } from "./deal/deal.service";
import { contractService } from './contract/contract.service';
import { proposalService } from './proposal/proposal.service';
import { POService } from './PO/PO.service';
import { SaleOrderService } from './SaleOrder/SaleOrder.service';
import { InvoiceService } from './Invoice/Invoice.service';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    proposalComponent,
    contractComponent,
    POComponent,
    InvoiceComponent,
    dealComponent,
    SaleOrderComponent,
    CustomerComponent,
    StaffComponent,
    acceptProposalComponent,
    rejectProposalComponent,
    acceptContractComponent,
    rejectContractComponent,
    initiatePOComponent,
    updatePaymentStatusComponent,
    createProposalComponent,
    createContractComponent,
    createDealComponent,
    createSOComponent,
    updateSOStatusComponent,
    createInvoiceComponent,
    LoginComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule
  ],
  providers: [
    DataService, 
    CookieService,
    acceptContractService,
    acceptProposalService,
    rejectContractService,
    rejectProposalService,
    initiatePOService,
    createInvoiceService,
    createContractService,
    createDealService,
    createProposalService,
    createSOService,
    updatePaymentStatusService,
    updateSOStatusService,
    dealService,
    proposalService,
    contractService,
    POService,
    SaleOrderService,
    InvoiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
