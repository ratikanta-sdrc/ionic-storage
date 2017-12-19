import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
/**
 * @author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
 * The poc is all about how to use ionic storage, i.e insertion, deletion and updation
 */
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
        this.storage.set('allDetails',this.allDetails)
      }else{
        this.allDetails=val
        console.log(this.allDetails)
      }
    });
    
  }
  /**this is the syntax of deleting a whole database against it's key name
    *this.storage.remove("allDetails")
  */
  submit(){
    if(this.allDetails.length!=0){
      //here the second comparator returns the length of the 'allDetails' array excluding the object containing current value of babyId during submission
      if(this.allDetails.length==this.allDetails.filter(obj => obj.babyId !== this.babyId).length){
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
          //this is the syntax of inserting data against a key name
          this.storage.set('allDetails',this.allDetails)
          this.presentAlert('baby details saved successfully!')
    }
  }
  getData(){
    //this is the process to get data from storage agaist a key name
    this.storage.get('allDetails').then((val) => {
      console.log(val)
    });
  }
  /**for removing I just replaced the data against the same key name and saved it again with the same key name.
   * if some one find any efficient way, please let me know
  */
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
