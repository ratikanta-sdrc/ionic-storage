import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


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
  constructor(private storage: Storage) {
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
        if(d.babyId != this.babyId){
          this.details.babyId=this.babyId
          this.details.motherName=this.motherName
          this.details.motherAge=this.motherAge
          this.allDetails.push(this.details);
          this.storage.set('allDetails',this.allDetails)
          console.log("baby details saved successfully!")
        }else{
          console.log("baby id already exists for id : "+d.babyId)
        }
      }
    }else{
      this.details.babyId=this.babyId 
          this.details.motherName=this.motherName
          this.details.motherAge=this.motherAge
          this.allDetails.push(this.details);
          this.storage.set('allDetails',this.allDetails)
          console.log("baby details saved successfully!")
    }
    
    
  }
  getData(){
    this.storage.get('allDetails').then((val) => {
      // console.log(val);
      
      console.log(val)
    });
  }
}
