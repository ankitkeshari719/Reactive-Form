import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUserNames = ['Ankit','Arvind'];
  signupForm: FormGroup;

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null,[Validators.required, Validators.email], this.forbiddenEmail),
      }),      
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // Get the values 
    this.signupForm.valueChanges.subscribe(
      (value)=>{
        console.log(value);
      }
    );

    // get the status of form
    this.signupForm.statusChanges.subscribe(
      (status)=>{
        console.log(status);
      }
    );

    // Set the pre polulated value
    this.signupForm.setValue({
      'userData':{
        'username':'Ankit',
        'email':'ankit@keshari@gslab.com'
      },
      'gender':'male',
      'hobbies':[]
    });

    // patch value
    this.signupForm.patchValue({
      'userData':{
        'username':'Arvind'
      }
    });

  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  // Add new Form control to FromArray
  addHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  
  // Custom Validator
  forbiddenNames(control: FormControl):{[s: string]: boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForBidden': true};
    }
    return null;
  }

  // Custom Async Validator
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any>{
    const promish = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value ===  'test@gmail.com'){
          resolve({'emailIsForBidden': true});
        }else{
          resolve(null);
        }
      },1500);
    });
    return promish;
  }

}
