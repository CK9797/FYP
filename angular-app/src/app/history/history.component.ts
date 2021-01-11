import { Component, OnInit } from '@angular/core';
import { acceptContractService } from "../acceptContract/acceptContract.service";
import { rejectContractService } from "../rejectContract/rejectContract.service";
import { updateSOStatusService } from '../updateSOStatus/updateSOStatus.service';
import { initiatePOService } from '../initiatePO/initiatePO.service';
import { acceptProposalService } from '../acceptProposal/acceptProposal.service';
import { rejectProposalService } from '../rejectProposal/rejectProposal.service';
import { createContractService } from '../createContract/createContract.service';
import { createDealService } from '../createDeal/createDeal.service';
import { createInvoiceService } from '../createInvoice/createInvoice.service';
import { createProposalService } from '../createProposal/createProposal.service';
import { createSOService } from '../createSO/createSO.service';
import { updatePaymentStatusService } from '../updatePaymentStatus/updatePaymentStatus.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {

  constructor(
    private serviceAcceptProposal: acceptProposalService,
    private serviceAcceptContract: acceptContractService,
    private serviceRejectProposal: rejectProposalService,
    private serviceRejectContract: rejectContractService,
    private serviecInitiatePO: initiatePOService,
    private serviceInvoice: createInvoiceService,
    private serviceContract: createContractService,
    private serviceDeal: createDealService,
    private serviceProposal: createProposalService,
    private serviceSO: createSOService,
    private serviceUpdatePayment: updatePaymentStatusService,
    private serviceUpdateSOStat: updateSOStatusService
  ) { }

  ngOnInit() {
  }

  foundDeal : any = [];
  foundContract : any = [];
  foundProposal : any = [];
  foundSO : any = [];
  foundPO : any = [];
  foundInvoice : any = [];
  foundUpdatePayment : any = [];
  foundAcceptPro : any = [];
  foundAcceptCon : any = [];
  foundRejectPro : any = [];
  foundRejectCon : any = [];
  foundUpdateSO : any = [];

  private errorMessage;


  searchValue: String;
  searchSuccess: boolean = false;

  getSearchValue(){
     
        
          
    this.searchValue = (String)($("#searchValue").val())

 }

 getDeal(){
   return this.serviceDeal.getTransaction(this.searchValue)
   .toPromise()
   .then((result)=>{
     if(result){
       alert("No Deal Found.");
     } else{
       this.find();
     }
   })
 }


  find(){
    console.log("Search Value: "+this.searchValue+".");

    this.findContract();
    this.findAcceptCon();
    this.findAcceptPro();
    this.findDeal();
    this.findInvoice();
    this.findPO();
    this.findProposal();
    this.findSO();
    this.findRejectPro();
    this.findRejectCon();
    this.findUpdateSOStat();
    this.findUpdatepayment();


    this.searchSuccess = true;
  }
  findDeal(){
    let allDeal = [];
    this.serviceDeal.getAll().subscribe(
      result => { allDeal=result;
      this.foundDeal = [];

      for(let i=0; i<allDeal.length; i++){
        if (allDeal[i].dealno == this.searchValue){
          this.foundDeal.push(allDeal[i])
        }
      }
    },
    error => {
      this.errorMessage.error("Enter a correct Deal","Error");
      if(this.foundDeal==null){
        alert("No Deal Found.")
      }
    }

    )
  }

  findContract(){
    let allContract = [];

    this.serviceContract.getAll().subscribe(
      result => { allContract=result;
      this.foundContract = [];

      for(let i=0; i<allContract.length; i++){
        if (allContract[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
          this.foundContract.push(allContract[i])
        }
      }
    },
    error => {
      this.errorMessage.error("Enter a correct Deal","Error");
    }

    )

  }
  
  findProposal(){
    let allProposal = [];
    this.serviceProposal.getAll().subscribe(
      result => {allProposal=result;
        this.foundProposal = [];

        for(let i=0; i<allProposal.length; i++){
          if(allProposal[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundProposal.push(allProposal[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
    
  }

  findSO(){
    let allSO = [];
    this.serviceSO.getAll().subscribe(
      result => {allSO=result;
        this.foundSO = [];

        for(let i=0; i<allSO.length; i++){
          if(allSO[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundSO.push(allSO[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )

  }
  findPO(){
    let allPO = [];
    this.serviecInitiatePO.getAll().subscribe(
      result => {allPO=result;
        this.foundPO = [];

        for(let i=0; i<allPO.length; i++){
          if(allPO[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundPO.push(allPO[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
  }
  findInvoice(){
    let allInvoice = [];
    this.serviceInvoice.getAll().subscribe(
      result => {allInvoice=result;
        this.foundInvoice = [];

        for(let i=0; i<allInvoice.length; i++){
          if(allInvoice[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundInvoice.push(allInvoice[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
  }
  findUpdatepayment(){
    let allUP = [];
    this.serviceUpdatePayment.getAll().subscribe(
      result => {allUP=result;
        this.foundUpdatePayment = [];

        for(let i=0; i<allUP.length; i++){
          if(allUP[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundUpdatePayment.push(allUP[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
  }
  findAcceptPro(){
    let allAcceptPro = [];
    this.serviceAcceptProposal.getAll().subscribe(
      result => {allAcceptPro=result;
        this.foundAcceptPro = [];

        for(let i=0; i<allAcceptPro.length; i++){
          if(allAcceptPro[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundAcceptPro.push(allAcceptPro[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
  }
  findRejectPro(){
    let allRejectPro = [];
    this.serviceRejectProposal.getAll().subscribe(
      result => {allRejectPro=result;
        this.foundRejectPro = [];

        for(let i=0; i<allRejectPro.length; i++){
          if(allRejectPro[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundRejectPro.push(allRejectPro[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
  }
  findAcceptCon(){
    let allAcceptCon = [];
    this.serviceAcceptContract.getAll().subscribe(
      result => {allAcceptCon=result;
        this.foundAcceptCon = [];

        for(let i=0; i<allAcceptCon.length; i++){
          if(allAcceptCon[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundAcceptCon.push(allAcceptCon[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
  }
  findRejectCon(){
    let allRejectCon = [];
    this.serviceRejectContract.getAll().subscribe(
      result => {allRejectCon=result;
        this.foundRejectCon = [];

        for(let i=0; i<allRejectCon.length; i++){
          if(allRejectCon[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundRejectCon.push(allRejectCon[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
  }
  
  findUpdateSOStat(){
    let allUSO = [];
    this.serviceUpdateSOStat.getAll().subscribe(
      result => {allUSO=result;
        this.foundUpdateSO = [];

        for(let i=0; i<allUSO.length; i++){
          if(allUSO[i].Deal == 'resource:org.acme.crmblockchain.deal#'+this.searchValue){
            this.foundUpdateSO.push(allUSO[i])
          }
        }

      },
      error => {
        this.errorMessage.error("Enter a correct Deal","Error");
      }
    )
  }

  
}

