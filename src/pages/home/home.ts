import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  details: any= {}
  babyId: string
  motherName: string
  motherAge: number
  allDetails: any = []
  avl: boolean=false
  constructor(private storage: Storage, private alertCtrl: AlertController) {
    this.storage.get('allDetails').then((val) => {
      if(val==null){
        this.allDetails=[]
        // this.allDetails.splice(1,1)
        this.storage.set('allDetails',this.allDetails)
        
      }else{
        this.allDetails=val
        console.log(this.allDetails)
      }
    });
    
  }
  // this.storage.remove("allDetails")

  submit(){
    if(this.allDetails.length!=0){
      for(let d of this.allDetails){
        if(d.babyId == this.babyId){
          this.avl=true
        }
      }
      if(!this.avl){
        var newDetails:any={}
        newDetails.babyId=this.babyId
        newDetails.motherName=this.motherName
        newDetails.motherAge=this.motherAge
        this.allDetails.push(newDetails)
        this.storage.set('allDetails',this.allDetails)
        this.presentAlert('baby details saved successfully!')
        this.avl=false
      }else{
        this.presentAlert("baby id already exists for id : "+this.babyId)
        this.avl=false
      }
    }else{
          this.details.babyId=this.babyId 
          this.details.motherName=this.motherName
          this.details.motherAge=this.motherAge
          this.allDetails.push(this.details);
          this.storage.set('allDetails',this.allDetails)
          this.presentAlert('baby details saved successfully!')
    }
    
    
  }
  getData(){
    this.storage.get('allDetails').then((val) => {
      console.log(val)
    });
  }
  deleteDetails(item){
    this.allDetails = this.allDetails.filter(obj => obj !== item);
    this.storage.set('allDetails',this.allDetails)
    this.presentAlert('baby details deleted successfully!')
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: msg,
      buttons: ['Ok']
    });
    alert.present();
  }
}
